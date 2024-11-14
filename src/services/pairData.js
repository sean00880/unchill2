import { ethers } from 'ethers';
import axios from 'axios';
import IUniswapV3FactoryABI from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';

// Define API keys for enhanced rate limits and performance
const INFURA_PROJECT_ID = '22588f8fe33d4ea0aa9063e108d20c4c';
const INFURA_PROJECT_SECRET = 'MmL3L0Z3PvUe0N/9prB8wh7HTjMg0oykD1kPOSGHNN1Kv1Lb4ESftw';
const ALCHEMY_API_KEY = '0NNvYcVz-WKSyCaZHb1isCAIBnYixKTI';
const ETHERSCAN_API_KEY = 'MFVSF1R4TCVKBW6R724RQDQDYFX7CN2S2D';

// Configure the default provider with API keys for better performance
const provider = ethers.getDefaultProvider('homestead', {
    etherscan: ETHERSCAN_API_KEY,
    infura: {
        projectId: INFURA_PROJECT_ID,
        projectSecret: INFURA_PROJECT_SECRET,
    },
    alchemy: ALCHEMY_API_KEY,
});

// Uniswap V3 factory address on Ethereum mainnet
const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984'; // Mainnet factory address

/**
 * @typedef {Object} PriceUpdate
 * @property {number} price1Token0 - Price of token0 in terms of token1.
 * @property {number} price1Token0InUsd - Price of token0 in USD.
 */

/**
 * Helper function to fetch the current price of ETH in USD
 * @returns {Promise<number|null>}
 */
const getEthUsdPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const ethPriceInUsd = response.data.ethereum.usd;
        console.log("ETH Price in USD:", ethPriceInUsd);
        return ethPriceInUsd;
    } catch (error) {
        console.error('Failed to fetch ETH price:', error);
        return null;
    }
};

/**
 * Calculate price based on Uniswap V3 sqrtPriceX96 format
 * @param {BigInt} sqrtPriceX96 - sqrtPriceX96 from Uniswap V3 pool
 * @param {number} decimal0 - decimals for token0
 * @param {number} decimal1 - decimals for token1
 * @returns {number} Calculated price for token0 in terms of token1
 */
const calculatePrice = (sqrtPriceX96, decimal0, decimal1) => {
    const price1Token0 = (sqrtPriceX96 ** 2n * BigInt(10) ** BigInt(decimal1)) / 
                         (BigInt(2) ** 192n * BigInt(10) ** BigInt(decimal0));
    return Number(price1Token0) / 1e18; // Convert to standard decimal format
};

/**
 * Fetches the real-time price of the token pair
 * @param {string} token0 - Address of token0
 * @param {string} token1 - Address of token1
 * @param {number} fee - Fee tier (e.g., 500 for 0.05%)
 * @returns {Promise<PriceUpdate | null>}
 */
export const getRealTimePrice = async (token0, token1, fee) => {
    try {
        const factoryContract = new ethers.Contract(factoryAddress, IUniswapV3FactoryABI.abi, provider);

        const poolAddress = await factoryContract.getPool(token0, token1, fee);
        if (poolAddress === ethers.constants.AddressZero) {
            console.error("No pool found for this token pair and fee tier.");
            return null;
        }

        const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider);

        // Call slot0 to retrieve the current sqrtPriceX96
        const slot0 = await poolContract.slot0();
        if (!slot0 || !slot0.sqrtPriceX96) {
            console.error("slot0 or sqrtPriceX96 is undefined.");
            return null;
        }
        const sqrtPriceX96 = slot0.sqrtPriceX96;

        const token0Contract = new ethers.Contract(token0, IUniswapV3PoolABI.abi, provider);
        const token1Contract = new ethers.Contract(token1, IUniswapV3PoolABI.abi, provider);

        // Fetch token decimals
        const [decimal0, decimal1] = await Promise.all([
            token0Contract.decimals(),
            token1Contract.decimals(),
        ]);

        // Calculate the price
        const price1Token0 = calculatePrice(BigInt(sqrtPriceX96), decimal0, decimal1);
        const ethPriceInUsd = await getEthUsdPrice();

        if (ethPriceInUsd === null) {
            console.error("ETH price in USD is unavailable.");
            return null;
        }

        const price1Token0InUsd = price1Token0 * ethPriceInUsd;

        console.log("Calculated price1Token0InUsd:", price1Token0InUsd);
        return {
            price1Token0,
            price1Token0InUsd
        };
    } catch (error) {
        console.error('Failed to fetch real-time price:', error);
        return null;
    }
};

/**
 * Subscribe to price updates via WebSocket
 * @param {string} token0 - Address of token0
 * @param {string} token1 - Address of token1
 * @param {number} fee - Fee tier (e.g., 500 for 0.05%)
 * @param {function(PriceUpdate): void} callback - Callback function to handle updated prices
 * @returns {function(): void} Unsubscribe function
 */
export const subscribeToPriceUpdates = async (token0, token1, fee, callback) => {
    try {
        const factoryContract = new ethers.Contract(factoryAddress, IUniswapV3FactoryABI.abi, provider);
        const poolAddress = await factoryContract.getPool(token0, token1, fee);

        if (poolAddress === ethers.constants.AddressZero) {
            console.error("No pool found for this token pair and fee tier.");
            return null;
        }

        const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider);

        // Event handler for Swap events
        const handler = async (sender, recipient, amount0, amount1, sqrtPriceX96) => {
            console.log("New Swap Event - Updating Prices");

            const ethPriceInUsd = await getEthUsdPrice();
            if (ethPriceInUsd === null) {
                console.error("ETH price in USD is unavailable.");
                return;
            }

            const token0Contract = new ethers.Contract(token0, IUniswapV3PoolABI.abi, provider);
            const token1Contract = new ethers.Contract(token1, IUniswapV3PoolABI.abi, provider);

            const [decimal0, decimal1] = await Promise.all([
                token0Contract.decimals(),
                token1Contract.decimals(),
            ]);

            const price1Token0 = calculatePrice(BigInt(sqrtPriceX96), decimal0, decimal1);
            const price1Token0InUsd = price1Token0 * ethPriceInUsd;

            console.log("Real-time price1Token0:", price1Token0);
            console.log("Real-time price1Token0InUsd:", price1Token0InUsd);

            callback({ price1Token0, price1Token0InUsd });
        };

        poolContract.on('Swap', handler);

        console.log("Subscribed to price updates via WebSocket.");

        // Return unsubscribe function
        return () => {
            console.log("Unsubscribing from price updates.");
            poolContract.off('Swap', handler);
        };
    } catch (error) {
        console.error("Failed to subscribe to price updates:", error);
        return null;
    }
};
