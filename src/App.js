import React  from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";

import Header from './components/Header';
import Home from './components/Home';
import Streams from './components/Streams'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import MintPage from './components/MintPage';

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/streams" element={<Streams/>}/>
          <Route path="/mint" element={<MintPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
