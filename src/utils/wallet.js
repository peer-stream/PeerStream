import React  from 'react';

require('dotenv').config();

const  Web3  =  require('web3');


  

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "eth_requestAccounts",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "Wallet Error: " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: "Metamask is required"
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "eth_requestAccounts",
          };
        } else {
          return {
            address: "",
            status: "Metamask Connect",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "Wallet error:" + err.message,
        };
      }
    } else {
      return {
        address: "",
      status: "Metamask is required",
      };
    }
  };

  