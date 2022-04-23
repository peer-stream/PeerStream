import React  from 'react';
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';

import { connectWallet, getCurrentWalletConnected} from "../utils/wallet.js";
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
      useEffect(async () => {
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address)
        setStatus(status);
        addWalletListener(); 
      
      


      
      
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
        <a href="#">Docs</a>
        <a href="#">About</a>
        <Button variant="primary" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}</Button>
        </div>
      </nav>
      <div className="content">
            <h1>Stream on-chain with Peer Stream!</h1>
        </div>
    </div>
  );
};

export default Header;