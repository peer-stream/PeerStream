import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import 'dotenv/config';
import { toHex, truncateAddress } from "./utils";
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

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});


const App = () => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new Web3(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  // const switchNetwork = async () => {
  //   try {
  //     await library.provider.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: toHex(network) }]
  //     });
  //   } catch (switchError) {
  //     if (switchError.code === 4902) {
  //       try {
  //         await library.provider.request({
  //           method: "wallet_addEthereumChain",
  //           params: [networkParams[toHex(network)]]
  //         });
  //       } catch (error) {
  //         setError(error);
  //       }
  //     }
  //   }
  // };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);


  // // const [web3Modal, setWeb3Modal] = useState();

  // const connectWallet = async () => { 
  //   try {
  //     const provider = await web3Modal.connect();
  //     const library = new Web3(provider);
  //     const accounts = await library.listAccounts();
  //     const network = await library.getNetwork();
  //     setProvider(provider);
  //     setLibrary(library);
  //     if (accounts) setAccount(accounts[0]);
  //     setChainId(network.chainId);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // // }

  // // const resetApp = async (error) => {
  // //   console.log(error);
  // //   console.log('disconnect')
  // //   const { web3 } = state;
  // //   if (web3 && web3.currentProvider && web3.currentProvider.close) {
  // //     await web3.currentProvider.close();
  // //   }
  // //   await web3Modal.clearCachedProvider();
  // //   setState({ ...INITIAL_STATE });
  // //   setAccount('');
  // // };

  // // const subscribe = async () => {
  // //   if (!window.ethereum.on) {
  // //     return;
  // //   }
  // //   window.ethereum.on("disconnect", async (error) => resetApp(error));
  // //   window.ethereum.on("chainChanged", async (chainId) => {
  // //     const { web3 } = state;
  // //     const networkId = await web3.eth.net.getId();
  // //     setState({ chainId, networkId });
  // //   });

  // //   // Subscribe to provider connection
  // //   window.ethereum.on("connect", async (info) => {
  // //     console.log(state);
  // //     const { web3 } = state;
  // //     const accounts = await web3.eth.accounts();
  // //     setState({ address: accounts[0] });
  // //     setAccount( accounts[0] );
  // //   });
  // // }
  
  // useEffect(() => {
  //   const f = async() => {
  //   await connectWallet();}
  //   f();
  //   // subscribe();
  // }, []);

  return (
    <div>
      <nav>
        <div className="left-side">
          <p>Logo</p>
        </div>
        <div className="right-side">
        <a href="#">Docs</a>
        <a href="#">About</a>
          <p onClick={connectWallet} className="connect-wallet">{ account===null ? 'Connect Wallet' : account}</p>
        </div>
      </nav>
      <div className="content">
            <h1>Stream on-chain with Peer Stream!</h1>
        </div>
    </div>
  )
}

export default App;
