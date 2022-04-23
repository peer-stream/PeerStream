import React  from 'react';
import './Home.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ping,getUsersNfts} from "../utils/lensApi";
import { getCurrentWalletConnected} from "../utils/wallet";

import '../utils/lensApi.js';
const MintPage = (props) => {

    const [pingStatus, setpingStatus] = useState("Waiting....");

    const [walletAddress, setWallet] = useState("");
    const contract = "0x54439D4908A3E19356F876aa6022D67d0b3B12d6";

    useEffect( () => {
        //const {address, status} =  getCurrentWalletConnected();
        // setWallet(address)


        ping().then(res => setpingStatus(res.data.ping=="pong"?"True":"False"));
   
        getUsersNfts(walletAddress,contract,[80001]).then(res => console.log(res.data));
   
      });


  return (
    <div className="MintPage">
      <h1>
       LivePeer & Lenst Protocol NFT mint page
      </h1>
      <div>
      <p>LensProtocol Connection: {pingStatus}</p>
      </div>

    </div>
  );
};

export default MintPage;