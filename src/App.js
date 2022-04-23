import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import 'dotenv/config';
const infuraID = process.env.REACT_APP_INFURA_ID;

const INITIAL_STATE = {
  fetching: false,
  address: "",
  web3: null,
  provider: null,
  connected: false,
  chainId: 1,
  networkId: 1,
  assets: [],
  showModal: false,
  pendingRequest: false,
  result: null
};

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: infuraID // required
    }
  }
};


const App = () => {

  const [account, setAccount] = useState('');
  const [state, setState] = useState();
  const [web3Modal, setWeb3Modal] = useState();

  const connectWallet = async () => { 
    try{
      const web3Modal = new Web3Modal({
        // network: "mainnet", // optional
        cacheProvider: false, // optional
        providerOptions // required
      });
      
      const provider = await web3Modal.connect();
      setState(provider);
      const web3 = new Web3(provider);
      setWeb3Modal(web3);
      const accounts = await web3.eth.getAccounts();

      setAccount(accounts[0]);
    } catch(error) {
      if(error === 4001){
        resetApp();
      } else {
        throw error;
      }
    }
  }

  const resetApp = async (error) => {
    console.log(error);
    console.log('disconnect')
    const { web3 } = state;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Modal.clearCachedProvider();
    setState({ ...INITIAL_STATE });
    setAccount('');
  };

  const subscribe = () => {
    if (!window.ethereum.on) {
      return;
    }
    window.ethereum.on("disconnect", (error) => resetApp(error));
    window.ethereum.on("accountsChanged", async (accounts) => {
      setState({ address: accounts[0] });
      setAccount( accounts[0] );
    });
    window.ethereum.on("chainChanged", async (chainId) => {
      const { web3 } = state;
      const networkId = web3.eth.net.getId();
      setState({ chainId, networkId });
    });

    // Subscribe to provider connection
    window.ethereum.on("connect", (info) => {
      console.log(info);
    });
  }
  
  useEffect(() => {
    subscribe();
  });

  return (
    <div>
      <nav>
        <div className="left-side">
          <p>Logo</p>
        </div>
        <div className="right-side">
        <a href="#">Docs</a>
        <a href="#">About</a>
          <p onClick={connectWallet} className="connect-wallet">{ account==='' ? 'Connect Wallet' : account}</p>
        </div>
      </nav>
      <div className="content">
            <p>content here</p>
        </div>
    </div>
  )
}

export default App;
