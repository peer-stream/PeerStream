import React  from 'react';
import { useEffect, useState } from "react";

import { connectWallet} from "../utils/wallet.js"; 
const Header = (props) => {

    



useEffect(async () => {


}, []);



  return (
    <div className="Header">

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
  );
};

export default Header;