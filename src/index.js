import React from 'react';
import ReactDOM from 'react-dom';
import "./assets/animated.css";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/elegant-icons/style.css';
import '../node_modules/et-line/style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import './assets/style.scss';
import './assets/custom.scss';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import './i18n'
import {Web3Provider} from "./providers/Web3Provider/provider";
import configAxios from './apis/index';

const CHAIN_IDS = process.env.REACT_APP_CHAIN_IDS?.split(',').map(id => parseInt(id));
console.log(CHAIN_IDS,'CHAIN_IDS')
const MARKET_ADDRESSES = [];
CHAIN_IDS.forEach((chainId, index) => {
    MARKET_ADDRESSES.push(process.env[`REACT_APP_MARKET_ADDRESS_${index}`]);
});

configAxios();

ReactDOM.render(
  <Web3Provider marketAddresses={MARKET_ADDRESSES} chainIds={CHAIN_IDS}>
    <App />
  </Web3Provider>,
  document.getElementById('root'));
serviceWorker.unregister();
