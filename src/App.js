import React from 'react';
import Timer from './Timer.js';
import Clock from './Clock.js';
import Countdown from './Countdown.js';
import './App.css';

let timer;
let countdown;

function App() {
  return (
    <div className="App">
      <Clock format="MM-DD-YYYY i:mm:ss a" />
      <div className="Chooser">
        <button onClick={SetTimer} id="timerChooserButton">Timer</button> |
        <button onClick={SetCountdown} id="countdownChooserButton">Countdown</button>
      </div>
      <div className="App-main">
        <Timer ref={(ref) => {timer = ref;}} />
        <Countdown ref={(ref) => {countdown = ref;}} />
      </div>
    </div>
  );
}

function SetTimer () {
  countdown.makeInvisible();
  timer.makeVisible();
  document.getElementById("timerChooserButton").classList.add("active-choice");
  document.getElementById("countdownChooserButton").classList.remove("active-choice");
}

function SetCountdown () {
  timer.makeInvisible();
  countdown.makeVisible();
  document.getElementById("timerChooserButton").classList.remove("active-choice");
  document.getElementById("countdownChooserButton").classList.add("active-choice");
}

export default App;
