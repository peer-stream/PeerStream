import React  from 'react';

import Header from './components/Header';
import Home from './components/Home';
import Streams from './components/Streams'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Header/>   
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/streams" element={<Streams/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;