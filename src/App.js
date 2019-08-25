import React from 'react';
import Timer from './Timer.js';
import Clock from './Clock.js';
import Countdown from './Countdown.js';
//import Chooser from './Chooser.js';
import './App.css';

let timer;
let countdown;

function App() {
  return (
    <div className="App">
      <Clock format="MM-DD-YYYY i:mm:ss a" />
      <div className="Chooser">
        <button onClick={SetTimer} id="timerChooserButton">Timer</button> | <button onClick={SetCountdown} id="countdownChooserButton">Countdown</button>
      </div>
      <div className="App-main">
        <Timer ref={(ref) => {timer = ref;}} />
        <Countdown ref={(ref) => {countdown = ref;}} parent={this} />
      </div>
    </div>
  );
}

function SetTimer () {
  timer.makeVisible();
  countdown.makeInvisible();
}

function SetCountdown () {
  countdown.makeVisible();
  timer.makeInvisible();
}

export default App;
