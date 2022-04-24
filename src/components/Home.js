import React  from 'react';
import './Home.css'
import peer_stream from '../peer_stream.svg'
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
const Home = (props) => {

  return (
    <div className='home'>
      <h1>
        New decentralized platform for streamers!
      </h1>
      <img className='big-logo' src={peer_stream} alt='peer-stream'/>
    </div>
  );
};

export default Home;