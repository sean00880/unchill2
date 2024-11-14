import Web3 from 'web3';

// Initialize web3 with a WebSocket provider
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/22588f8fe33d4ea0aa9063e108d20c4c'));

export default web3;
