import { client, POSITION_QUERY } from '../lib/v3Urql';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import axios from 'axios';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import ERC20_ABI from 'erc-20-abi';

const POOL_ADDRESS = '0x0c30062368eefb96bf3ade1218e685306b8e89fa';
const RPC_URL = 'wss://mainnet.infura.io/ws/v3/22588f8fe33d4ea0aa9063e108d20c4c';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

const web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));
const uniswapV3PoolContract = new web3.eth.Contract(IUniswapV3PoolABI.abi, POOL_ADDRESS);

const getTokenDecimals = async (tokenAddress) => {
    const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    return await tokenContract.methods.decimals().call();
};

const fetchWethPriceInUsd = async () => {
    try {
        const response = await axios.get(COINGECKO_API_URL);
        return response.data.ethereum.usd;
    } catch (error) {
        console.error("Error fetching WETH price from CoinGecko:", error);
        throw new Error("Failed to fetch WETH price");
    }
};

// Compute active liquidity at a specific stop tick based on provided ticks
const computeActiveLiquidityAtStopTick = (ticks, currentTickIdx, initialLiquidity, stopTickIdx) => {
    const sortedTicks = [...ticks].sort((a, b) => a.tickIdx - b.tickIdx);
    let state = { liquidity: initialLiquidity };
    const movingUpward = stopTickIdx > currentTickIdx;

    for (const { tickIdx, liquidityNet } of sortedTicks) {
        if (movingUpward && (tickIdx <= currentTickIdx || tickIdx >= stopTickIdx)) continue;
        if (!movingUpward && (tickIdx >= currentTickIdx || tickIdx < stopTickIdx)) continue;

        state.liquidity += (movingUpward ? 1n : -1n) * BigInt(liquidityNet);
    }

    return state.liquidity;
};

// Fetch liquidity based on ticks and compute it using active liquidity method
export const fetchLiquidity = async (skip = 0) => {
    try {
        const response = await client.query(POSITION_QUERY, { pool_id: POOL_ADDRESS, num_skip: skip }).toPromise();

        if (!response || !response.data || !response.data.pool) {
            throw new Error("No pool data returned from The Graph.");
        }

        const poolData = response.data.pool;
        const decimals0 = parseInt(poolData.token0.decimals, 10);
        const decimals1 = parseInt(poolData.token1.decimals, 10);

        // Determine the current tick and stop tick based on your business logic
        const currentTickIdx = parseInt(poolData.tick, 10);
        const stopTickIdx = currentTickIdx - 10;

        const ticks = response.data.positions.map((position) => ({
            tickIdx: parseInt(position.tickLower.tickIdx, 10),
            liquidityNet: position.liquidity
        }));

        const initialLiquidity = BigInt(poolData.liquidity);
        const activeLiquidity = computeActiveLiquidityAtStopTick(ticks, currentTickIdx, initialLiquidity, stopTickIdx);

        const wethPriceUsd = await fetchWethPriceInUsd();

        // Log values for debugging
        console.log("Active Liquidity (raw):", activeLiquidity.toString());
        console.log("Decimals0:", decimals0, "Decimals1:", decimals1);
        console.log("WETH Price (USD):", wethPriceUsd);

        // Properly scale the active liquidity for the USD conversion
        const scaledLiquidity = new BigNumber(activeLiquidity.toString()).dividedBy(new BigNumber(10).pow(decimals0));
        const liquidityUsdValue = scaledLiquidity.multipliedBy(wethPriceUsd).toFixed(2);

        console.log("Liquidity in USD:", liquidityUsdValue);

        return {
            liquidity: formatNumber(liquidityUsdValue),
            feePercentage: `${poolData.feeTier / 10000}%`
        };
    } catch (error) {
        console.error("Error fetching liquidity:", error);
        throw new Error("Failed to fetch liquidity.");
    }
};

const formatNumber = (number) => {
    const absNumber = Math.abs(number);
    if (absNumber >= 1.0e+9) {
        return `$${(absNumber / 1.0e+9).toFixed(2)}B`;
    } else if (absNumber >= 1.0e+6) {
        return `$${(absNumber / 1.0e+6).toFixed(2)}M`;
    } else if (absNumber >= 1.0e+3) {
        return `$${(absNumber / 1.0e+3).toFixed(2)}K`;
    }
    return `$${absNumber.toFixed(2)}`;
};

const GetPrice = (poolInfo) => {
    const sqrtPriceX96 = new BigNumber(poolInfo.sqrtPriceX96);
    const Decimal0 = poolInfo.decimal0;
    const Decimal1 = poolInfo.decimal1;

    const price = sqrtPriceX96
        .dividedBy(new BigNumber(2).pow(96))
        .pow(2)
        .dividedBy(new BigNumber(10).pow(Decimal1).dividedBy(new BigNumber(10).pow(Decimal0)))
        .toFixed(Decimal1);

    return price;
};

export const fetchPairsPrice = async (blockNumber = 'latest') => {
    try {
        const slot0 = await uniswapV3PoolContract.methods.slot0().call({}, blockNumber);
        const sqrtPriceX96 = slot0[0];
        const token0Address = await uniswapV3PoolContract.methods.token0().call();
        const token1Address = await uniswapV3PoolContract.methods.token1().call();
        const decimal0 = await getTokenDecimals(token0Address);
        const decimal1 = await getTokenDecimals(token1Address);

        const poolInfo = { sqrtPriceX96, decimal0: parseInt(decimal0), decimal1: parseInt(decimal1) };
        return GetPrice(poolInfo);
    } catch (error) {
        console.error("Error fetching pool info:", error);
        throw new Error("Failed to fetch price");
    }
};

export const fetchMarketCap = async () => {
    try {
        const totalSupply = await uniswapV3PoolContract.methods.totalSupply().call();
        const price = await fetchPairsPrice();

        const marketCap = new BigNumber(totalSupply).multipliedBy(price).dividedBy(1e18).toNumber();
        return formatNumber(marketCap);
    } catch (error) {
        console.error("Error fetching market cap:", error);
        throw new Error("Failed to fetch market cap");
    }
};

export const fetchHistoricalPrice = async (timeAgoInHours) => {
    const secondsPerBlock = 12;
    const blocksAgo = Math.floor((timeAgoInHours * 60 * 60) / secondsPerBlock);

    const latestBlock = Number(await web3.eth.getBlockNumber());
    const historicalBlock = latestBlock - blocksAgo;

    return await fetchPairsPrice(historicalBlock);
};
