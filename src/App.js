import React from 'react';
import Timer from './components/Timer.js';
import Clock from './components/Clock.js';
import Countdown from './components/Countdown.js';
import Alarm from './components/Alarm.js';
import './App.css';

let apps = {}, appButtons = {};

function App() {
  return (
    <div className="App">
      <Clock format="MM-DD-YYYY i:mm:ss a" />
      <div className="Chooser">
        <button onClick={HandleClick} id="timer" ref={(ref) => appButtons['timer'] = ref}>Timer</button> |
        <button onClick={HandleClick} id="countdown" ref={(ref) => appButtons['countdown'] = ref}>Countdown</button> |
        <button onClick={HandleClick} id="alarm" ref={(ref) => appButtons['alarm'] = ref}>Alarm</button>
      </div>
      <div className="App-main">
        <Timer ref={(ref) => apps['timer'] = ref} />
        <Countdown ref={(ref) => apps['countdown'] = ref} />
        <Alarm ref={(ref) => apps['alarm'] = ref} />
      </div>
    </div>
  );
}

function HandleClick(e) {
  e.preventDefault();

  // eslint-disable-next-line
  for(let app in apps) {
    apps[app].setVisibility(false);
    appButtons[app].classList.remove('active-choice');
  }

  apps[e.target.attributes.id.value].setVisibility(true);
  appButtons[e.target.attributes.id.value].classList.add('active-choice');
}

export default App;
