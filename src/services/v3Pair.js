
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import ERC20_ABI from 'erc-20-abi';

const POOL_ADDRESS = '0x0c30062368eefb96bf3ade1218e685306b8e89fa';
const RPC_URL = 'wss://mainnet.infura.io/ws/v3/22588f8fe33d4ea0aa9063e108d20c4c';
const web3 = new Web3(new Web3.providers.WebsocketProvider(RPC_URL));
const uniswapV3PoolContract = new web3.eth.Contract(IUniswapV3PoolABI.abi, POOL_ADDRESS);

const getTokenDecimals = async (tokenAddress) => {
    const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
    return await tokenContract.methods.decimals().call();
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
