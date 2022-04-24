import React  from 'react';

import { Web3Provider } from './utils/web3ModalContext';

import Header from './components/Header';
import Home from './components/Home';
import StreamList from './components/StreamList';
import StreamCreation from './components/StreamCreation';
import Stream from './components/Stream';
import MintPage from './components/MintPage';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div>
      <Web3Provider>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/streams" element={<StreamList/>}/>
            <Route path="/mint" element={<MintPage/>}/>
            <Route path='/go-live' element={<StreamCreation/>}/>
            <Route path='/watch/:id' element={<StreamCreation/>}/>
          </Routes>
        </Router>
      </Web3Provider>
    </div>
  );
}

export default App;
