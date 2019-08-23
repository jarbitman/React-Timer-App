import React from 'react';
import Timer from './Timer.js';
import Clock from './Clock.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Clock />
      <header className="App-header">
        <Timer />
      </header>
    </div>
  );
}

export default App;
