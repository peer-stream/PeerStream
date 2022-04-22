import React from "react";

import "./App.css";

const App = () => {
  return (
    <div>
      <nav>
        <div className="left-side">
          <p>Logo</p>
        </div>
        <div className="right-side">
          <a href="#">Docs</a>
          <a href="#">About</a>
          <p className="connect-wallet">Connect Wallet</p>
        </div>
      </nav>
      <div className="content">
            <p>content here</p>
        </div>
    </div>
  )
}

export default App;
