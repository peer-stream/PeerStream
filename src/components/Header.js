import React  from 'react';
import '../App.css';
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, authorizeWallet } from "../utils/wallet.js";
import { setAuthToCache } from '../utils/cacheAuth';
const Header = (props) => {

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
        } else {
          setWallet("");
          setStatus("");
        }
      });
    } else {
      setStatus(
        "Metamask is required"
      );
    }
  }  
  useEffect(() => {
    const wallet = async () => {
      return await getCurrentWalletConnected();
    }
    const authorize = async () => {
      const {token} = await authorizeWallet(address);
      setAuthToCache(token);
    }
    const {address, status} = wallet();
    setWallet(address);
    setStatus(status);
    authorize();
    addWalletListener(); 
    console.log(walletAddress);
  }, []);
  
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };


  return (
    <div className="Header">
      <nav>
        <div className="left-side">
          <p>Logo</p>
        </div>
        <div className="right-side">
        <a href="/mint">Mint Video NFT</a>
        <a href="#">Docs</a>
        <a href="#">About</a>
        <p className='connect-wallet' onClick={connectWalletPressed}>
        {walletAddress?.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}</p>
        </div>
      </nav>
    </div>
  );
};

export default Header;