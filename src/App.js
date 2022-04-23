import React   from 'react';
import './App.css';

import Header from './components/Header';


import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";


function App() {

  return (
     
       <div className="App">
        
        <Router>
         <Header></Header>    
         <Routes>
         <Route path="/" element={<Home />} />
        </Routes>
         </Router>
 
    </div>
  
   
  );
}

export default App;