import React from 'react';
import {/*FaTrashAlt,*/ FaClock} from 'react-icons/fa';
import * as utils from './helpers.js';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      countdownRemaining: 0,
      interval: null,
      hasRun: false,
      hr: 0,
      min: 0,
      sec: 0,
      originalSeconds: 0,
      dingSound: 'ding.mp3',
      isVisible: false
    };

    this.updateCountdownTime = this.updateCountdownTime.bind(this);
  }

  incrementTick = () => {
    if (this.state.countdownRemaining !== 0) {
      this.setState((prevState, {Countdown}) => ({
        countdownRemaining: prevState.countdownRemaining - 1,
      }));
    } else {
      this.makeVisible();
      this.player.play();
      this.resetCountdown();
    }
  }

  startCountdown = () => {
    if (this.state.countdownRemaining !== 0) {
      this.player.src = this.state.dingSound;
      if (!this.state.hasRun) {
        this.setState({
          originalSeconds: this.state.countdownRemaining,
        })
      }
      this.setState((prevState) => ({
        interval: setInterval(this.incrementTick, 1000),
        isRunning: true,
        hasRun: true
      }));
    }
  }

  stopCountdown = () => {
    clearInterval(this.state.interval);
    this.setState((prevState) => ({
      interval: null,
      isRunning: false,
    }));
  }

  resetCountdown = () => {
    this.stopCountdown();
    let newTime = utils.toHMS(this.state.originalSeconds);
    this.setState({
      hasRun: false,
      countdownRemaining: this.state.originalSeconds,
      hr: newTime.hours,
      min: newTime.minutes,
      sec: newTime.seconds,
    });
  }

  resumeCountdown = () => {
    this.startCountdown();
  }

  pauseCountdown = () => {
    this.stopCountdown();
  }

  ToggleRunning = () => {
    if (!this.state.isRunning) {
      if (!this.state.hasRun) {
        return (<button onClick={this.startCountdown} className="StartButton" disabled={this.state.countdownRemaining === 0}>Start</button>);
      } else {
        return (<button onClick={this.resumeCountdown} className="ResumeButton">Resume</button>);
      }
    } else {
      return (<button onClick={this.pauseCountdown} className="PauseButton">Pause</button>);
    }
  }

  ResetButton = () => {
    if (!this.state.isRunning) {
      return (<button onClick={this.resetCountdown} className="ResetButton">Reset</button>);
    } else {
      return '';
    }
  }

  getCurrentTime = () => {
    return this.state.countdownRemaining * 1000;
  }

  updateCountdownTime = (e) => {
    e.preventDefault();

    // keep input value the same
    let newState = {};
    newState[e.target.id] = utils.removeNonNumeric(e.target.value);
    this.setState(newState, () => {
      // calculate HH:MM:SS for time set
      const newTime = 3600 * parseInt(this.state.hr) + 60 * parseInt(this.state.min) + parseInt(this.state.sec);
      const rem = utils.toHMS(newTime);
      this.setState({
        hr: rem.hours,
        min: rem.minutes,
        sec: rem.seconds,
        countdownRemaining: newTime,
      })
    });
  }

  ShowCountdown = () => {
    if (this.state.hasRun) {
      return utils.formatTime(this.getCurrentTime());
    } else {
      return (
        <span className="CountdownSetter">
          <input type="text" name="hr" id="hr" value={utils.padNumber(this.state.hr, 2)} onChange={this.updateCountdownTime} /> : <input type="text" name="min" id="min" value={utils.padNumber(this.state.min, 2)} onChange={this.updateCountdownTime} /> : <input type="text" name="sec" id="sec" value={utils.padNumber(this.state.sec, 2)} onChange={this.updateCountdownTime} />
        </span>
      )
    }
  }

  setVisibility = (newVisibility) => {
    this.setState({
      isVisible: newVisibility,
    });
  }

  render = () => {
    const player = <audio ref={(ref) => {this.player = ref; }} />;
    if (this.state.isVisible) {
      return (
        <div>
          <div className="Countdown"><this.ShowCountdown /> <FaClock /></div><br /><br />
          <this.ToggleRunning /> <this.ResetButton />
          {player}
        </div>
      );
    } else {
      return (
        <div>
          {player}
        </div>
      );
    }
  }
}

export default Countdown;
