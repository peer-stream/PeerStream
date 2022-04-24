import React  from 'react';
import './Home.css';
import peer_stream from '../peer_stream.svg';
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
const Home = (props) => {

  return (
    <div className='home'>
      <img className='big-logo' src={peer_stream} alt='peer-stream'/>
      <h1 className='home-style'>
        New <br/>decentralized<br/> platform<br/> for<br/> streamers!
      </h1>
    </div>
  );
};

export default Home;