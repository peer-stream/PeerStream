import React  from 'react';
import { useEffect, useState } from "react";
import axios from 'axios'
import { useWeb3 } from '../utils/web3ModalContext';
import '../App.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const web3 = useWeb3();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connected) {
      const accessToken = localStorage.getItem('access_token');
      const accessTokenExpiry = Number(localStorage.getItem('access_token_expires_at'));
      const now = Date.now();
      if (!accessToken || accessToken.length === 0 || now > accessTokenExpiry) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_token_expires_at');
        signIn();
      } else {
        console.log('token exists and not expired')
      }
    }
  }, [connected]);

  useEffect(() => {
    if (web3.account) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [web3.account]);

  const connectToWallet = async () => {
    if (connected) {
      await web3.clearCachedProvider();
      setConnected(false);
    } else {
      try {
        await web3.connect();
        setConnected(true);
      } catch (err) {
        console.log(err);
        setConnected(false);
      }
    }
  }

  const signIn = async () => {
    const nonceRequest = await axios.post('https://ethamsterdam.herokuapp.com/auth/nonce', { address: web3.account });
    const signature = await web3.signer?.signMessage(nonceRequest.data.message_to_sign);
    const accessTokenRequest = await axios.post('https://ethamsterdam.herokuapp.com/auth/token', {
      address: web3.account,
      signature
    });
    localStorage.setItem('access_token', accessTokenRequest.data.token);
    localStorage.setItem('access_token_expires_at', accessTokenRequest.data.expires_at);
  }

  return (
    <div className="border-gradient border-gradient-purple">
      <nav>
        <div className="left-side">
          <Link to="/"><img className='logo' src='/peer_stream.png' alt="Peer Stream logo" /></Link>
        </div>
        <div className="right-side">
        <Link className='link' to="/go-live">Go Live</Link>
        <Link className='link' to="/streams">Streams</Link>
        <Link className='link' to="/mint">Mint Video NFT</Link>
        <p className='connect-wallet' onClick={connectToWallet}>
          {connected ? (
            "Connected: " +
            String(web3.account).substring(0, 6) +
            "..." +
            String(web3.account).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
