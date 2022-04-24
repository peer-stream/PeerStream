import { ethers } from 'ethers';
import authorization from '../requests/authentication/authorization';
import createNonce from '../requests/authentication/createNonce';

require('dotenv').config();

export const authorizeWallet = async (address) => {
  if(window.ethereum){
    try{
      const message_to_sign = await createNonce(address);
      console.log('message', message_to_sign);
      // await window.ethereum.send('eth_requestAccounts');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const signature = await signer.signMessage(message_to_sign);
      const token = await authorization(address, signature);
      return {
        token,
        status: 'Authentication successful'
      };
    } catch(err){
      return {
        token: '',
        status: 'Authentication error: ' + err
      }
    }
  } else {
      return {
        token: '',
        status: "Metamask is required"
      };
    }
}

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
