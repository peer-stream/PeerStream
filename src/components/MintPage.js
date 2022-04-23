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
    const [nftList, setNnftList] = useState([]);
    const [nftLenght, setNftLenght] = useState(0);

    useEffect( () => {
    getCurrentWalletConnected().then(res => setWallet(res.address));



        ping().then(res => setpingStatus(res.data.ping=="pong"?"True":"False"));
   
        if(walletAddress){

            getUsersNfts(walletAddress,contract,[80001]).then((res) =>{
           if(res.data.nfts){
            setNftLenght(res.data.nfts.length);
            let tempItems= [];
                
            for(let i=1;i<=res.data.nfts.items.length;i++){
           
              tempItems.push(res.data.nfts.items[i]);
              }
          
              setNnftList(tempItems);
           }
           else{
            setNftLenght(0);
           }
    }
   

             );
        }
   
      });


  return (
    <div className="MintPage">
      <h1>
       LivePeer & Lenst Protocol NFT mint page
      </h1>
      <div>
      <p>LensProtocol Connection: {pingStatus}</p>
      <p> Number Of User's Nfts {nftLenght} </p>


        <h4>  All NFT's</h4>
        {nftList.map((object, i) => 
              <div>
            <img src={object}/>
            <p>NFT ID: #{i+1}</p>
   

             </div>   
        )}

    </div>
      </div>
    );
};


export default MintPage;