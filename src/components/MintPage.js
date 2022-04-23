import React  from 'react';
import './Mint.css'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ping,getUsersNfts} from "../utils/lensApi";
import { getCurrentWalletConnected} from "../utils/wallet";

import '../utils/lensApi.js';
const MintPage = (props) => {

    const [pingStatus, setpingStatus] = useState("Waiting....");

    const [walletAddress, setWallet] = useState("");
    const contract = "0xA4E1d8FE768d471B048F9d73ff90ED8fcCC03643";
    const [nftList, setNnftList] = useState([]);
    const [nftLenght, setNftLenght] = useState(0);
    const [imgList, setImgsList] = useState([]);
    
    const axios = require('axios');

    useEffect( () => {
    getCurrentWalletConnected().then(res => setWallet(res.address));



        ping().then(res => setpingStatus(res.data.ping=="pong"?"True":"False"));
   
        if(walletAddress && nftLenght==0){

            getUsersNfts(walletAddress,contract,[80001]).then((res) =>{
              console.log(res.data);
           if(res.data.nfts){
            setNftLenght(res.data.nfts.length);
            let tempItems= [];
            let tempImages= [];
                
            for(let i=1;i<=res.data.nfts.items.length;i++){
           
              tempItems.push(res.data.nfts.items[i]);
          axios.get(res.data.nfts.items[i].contentURI).then(resp => {
            var newStr = resp.data.image.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
            tempImages.push(newStr);
          });

              }
              setNnftList(tempItems);
              setImgsList(tempImages);
              
           }
           else{
            setNftLenght(0);
           }
    }
   

             );
        }
   
      });


  return (
    <div className="mint-page">
      <h1>
       LivePeer & Lenst Protocol NFT mint page
      </h1>
      
      <div className=''>
        <div className='nft-info'>
          <h2>
            Lens Protocol Data:
          </h2>
          <p>LensProtocol Connection: {pingStatus}</p>
          <p>Number Of User's Nfts {nftLenght} </p>
        </div>
        <h4>  All NFT's</h4>
        {nftList.map((object, i) => 
              <div>
            <img src={nftList[i]}/>
            <p>NFT ID: #{i+1}</p>
          
            <p>Name: {nftList[i].name.toString()}</p>
            <p>collectionName: {nftList[i].collectionName.toString()}</p>
            <p>contentURI: {nftList[i].contentURI.toString()}</p>
            <p>img: {imgList[i].toString()}</p>
            <p>OpenSea link {"https://testnets.opensea.io/assets/mumbai/0xA4E1d8FE768d471B048F9d73ff90ED8fcCC03643/"+nftList[i].tokenId.toString()}</p>
            <p>contractName: {nftList[i].contractName.toString()}</p>
            <p>description: {nftList[i].description.toString()}</p>
            <p>ercType: {nftList[i].ercType.toString()}</p>
            <p>name: {nftList[i].name.toString()}</p>
            <p>tokenId: {nftList[i].tokenId.toString()}</p>
            </div>   
        )}

      </div>

        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
          <div class="col">
            <div class="card mb-6 rounded- shadow-sm">
              <div class="card-header py-3">
                <h2>Mint Video NFT</h2>
              </div>
              <div class="card-body">
                <div class="input-group">
                  <input type="text" className="form-control" id="depositInput" placeholder="Name"/>
                </div> 
              <div class="input-group">
                <input type="text" className="form-control" id="depositInput" placeholder="IPFS link"/>
              </div> 
              <div class="input-group">
                <button type="submit"   className="btn btn-primary">Mint</button>
              </div>      
            </div>
          </div>
        </div>
      <div>
    </div>
  </div>
</div>
    );
};


export default MintPage;