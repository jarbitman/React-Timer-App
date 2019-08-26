import React from 'react';
import Timer from './Timer.js';
import Clock from './Clock.js';
import Countdown from './Countdown.js';
import './App.css';

let timer, countdown, TimerChooserButton, CountdownChooserButton;

function App() {
  return (
    <div className="App">
      <Clock format="MM-DD-YYYY i:mm:ss a" />
      <div className="Chooser">
        <button onClick={SetTimer} id="timerChooserButton" ref={(ref) => TimerChooserButton = ref}>Timer</button> |
        <button onClick={SetCountdown} id="countdownChooserButton" ref={(ref) => CountdownChooserButton = ref}>Countdown</button>
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
  TimerChooserButton.classList.add("active-choice");
  CountdownChooserButton.classList.remove("active-choice");
}

function SetCountdown () {
  timer.makeInvisible();
  countdown.makeVisible();
  TimerChooserButton.classList.remove("active-choice");
  CountdownChooserButton.classList.add("active-choice");
}

export default App;
