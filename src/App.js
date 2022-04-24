import React  from 'react';

import { Web3Provider } from './utils/web3ModalContext';

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
      <Web3Provider>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/streams" element={<Streams/>}/>
            <Route path="/mint" element={<MintPage/>}/>
          </Routes>
        </Router>
      </Web3Provider>
    </div>
  );
}

export default App;
