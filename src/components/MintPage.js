import React from 'react';
import axios from 'axios';
import './mint.css'
import { useEffect, useState } from "react";

import { useWeb3 } from '../utils/web3ModalContext';
import { ping,getUsersNfts} from "../utils/lensApi";

import '../utils/lensApi.js';

const MintPage = (props) => {
    const web3 = useWeb3();
    const [pingStatus, setpingStatus] = useState("Waiting....");

    const contract = "0xA4E1d8FE768d471B048F9d73ff90ED8fcCC03643";
    const [nftList, setNnftList] = useState([]);
    const [nftLenght, setNftLenght] = useState(0);
    const [imgList, setImgsList] = useState([]);

    const connectToWallet = async () => {
      await web3.connect();
      // web3.account -> wallet address
    }



    useEffect(() => {
      if(web3.account == null){
        connectToWallet();

      }
      connectToWallet();
        ping().then(res => setpingStatus(res.data.ping==="pong"?"True":"False"));
   
try {
  if(web3.account && nftLenght===0){
    console.log("wallet adress");
    console.log(web3.account)

      getUsersNfts(web3.account,contract,[80001]).then((res) =>{
  
     if(res.data.nfts){
      setNftLenght(res.data.nfts.length);
      let tempItems= [];
      let tempImages= [];
          
       for(let i=0;i<=res.data.nfts.items.length;i++){
        console.log(res.data.nfts.items);
        if(tempItems.length<res.data.nfts.items.length){
          tempItems.push(res.data.nfts.items[i]);
        }
        if(res.data.nfts.items){
      try {
       axios.get(res.data.nfts.items[i].contentURI).then(resp => {
          var newStr = resp.data.image.replace("ipfs://", "https://ipfs.moralis.io:2053/ipfs/");
          tempImages.push(newStr);
        });
       } catch (error) {
         console.log(error);
       }
        }


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
  
} catch (error) {
  
  console.log("error",error)
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
        <h2>All NFT's</h2>
        <div className='nfts'>
          {nftList.length>0?
          nftList.map((object, i) => 
              <div className='nft-container'>
                <img src='/livepeer.png' alt='live-peer'/>
                <div className='nft-inner-content'>
                  <h3>NFT ID: #{i+1}</h3>
                  <p>Name: {nftList[i].name.toString()}</p>
                  <p>collectionName: {nftList[i].collectionName.toString()}</p>
                  <a href={nftList[i].contentURI.toString()}>contentURI</a>
                  <p>img: {imgList[i]}</p>
                  <a href={"https://testnets.opensea.io/assets/mumbai/0xA4E1d8FE768d471B048F9d73ff90ED8fcCC03643/"+nftList[i].tokenId.toString()}>OpenSea</a>
                  <p>contractName: {nftList[i].contractName.toString()}</p>
                  <p>description: {nftList[i].description.toString()}</p>
                  <p>ercType: {nftList[i].ercType.toString()}</p>
                  <p>name: {nftList[i].name.toString()}</p>
                  <p>tokenId: {nftList[i].tokenId.toString()}</p>
                </div>
              </div>   
            ):<p></p>}
        </div>
      </div>
          <div>
            <h2>Mint Video NFT</h2>
          </div>
      <div className='nft-info'>
          <div >
            <div>
              <input type="text" className="form-control" id="depositInput" placeholder="Name"/>
            </div> 
          <div>
            <input type="text" className="form-control" id="depositInput" placeholder="IPFS link"/>
          </div> 
          <div>
            <button type="submit" className="btn btn-primary">Mint</button>
          </div>      
        </div>
      </div>
      </div>

    );
};


export default MintPage;
