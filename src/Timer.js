import React from 'react';
import {FaTrashAlt, FaClock} from 'react-icons/fa';
import {padNumber, formatTime} from './helpers.js';
import { animateScroll } from "react-scroll";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starts: [],
      stops: [],
      isRunning: false,
      laps: [],
      interval: null,
      isVisible: false,
    };
  }

  incrementTick = () => {
    this.setState((prevState, {timer}) => ({
      elapsed: new Date() - prevState.start,
    }));
  }

  startTimer = () => {
    this.setState((prevState) => ({
      starts: [...this.state.starts, new Date()],
      interval: setInterval(this.incrementTick, 1),
      isRunning: true,
    }));
  }

  stopTimer = () => {
    clearInterval(this.state.interval);
    this.setState((prevState) => ({
      interval: null,
      isRunning: false,
      stops: [...this.state.stops, new Date ()]
    }));
  }

  lap = () => {
    this.setState((prevState, {lap}) => ({
      laps: [...this.state.laps, formatTime(this.getCurrentTime())]
    }), this.scrollToBottom);
  }

  scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "LapLog"
    });
  }

  reset = () => {
    this.stopTimer();
    this.setState(() => ({
      laps: [],
      starts: [],
      stops: [],
    }));
  }

  filterLapArray = (lapArray, itemToRemove) => {
    return lapArray.filter((item, i) => item !== itemToRemove);
  }

  deleteLap = (e) => {
    this.newLapArray = this.filterLapArray(this.state.laps, e.target.closest(".lap").attributes.laptime.value);
    this.setState((prevState) => ({
      laps: this.newLapArray
    }));
  }

  StartButton = () => {
    if (!this.state.isRunning) {
      let startText = 'Start';
      if (this.state.starts.length) {
        startText = 'Resume';
      }
      return (<button onClick={this.startTimer} className="StartButton">{startText}</button>)
    } else {
      return '';
    }
  }

  StopButton = () => {
    if (this.state.isRunning) {
      return (<button onClick={this.stopTimer} className="StopButton">Stop</button>)
    } else {
      return '';
    }
  }

  LapButton = () => {
    if (this.state.isRunning) {
      return (<button onClick={this.lap} className="LapButton">Lap</button>)
    } else {
      return '';
    }
  }

  ResetButton = () => {
    if (this.state.starts.length) {
      return (<button onClick={this.reset} className="ResetButton">Reset</button>)
    } else {
      return '';
    }
  }

  getCurrentTime = () => {
    let elapsed = 0;
    for (let i = 0; i < this.state.stops.length; i++) {
      elapsed += this.state.stops[i] - this.state.starts[i];
    }
    if (this.state.isRunning) {
      elapsed += new Date () - this.state.starts[this.state.starts.length - 1];
    }
    return elapsed;
  }

  Laps = () => {
    let padLapsTo = ("" + this.state.laps.length).length;
    return this.state.laps.map(
      (lapTime, i) =>
      <div className="lap" laptime={lapTime} key={'lap' + (i+1).toString()}>
        Lap {padNumber(i+1, padLapsTo)}: {lapTime} <FaTrashAlt onClick={this.deleteLap} id={'lap' + (i+1).toString()} laptime={lapTime} />
      </div>
    );
  }

  makeVisible = () => {
    this.setState({
      isVisible: true,
    });
  }

  makeInvisible = () => {
    this.setState({
      isVisible: false,
    });
  }

  getClass = () => {
    return (this.state.isVisible) ? 'active-choice' : '';
  }

  isVisible = () => {
    return this.state.isVisible;
  }

  render = () => {
    if (this.state.isVisible) {
      return (
        <div>
          <div className="Timer">{formatTime(this.getCurrentTime())} <FaClock /></div><br /><br />
          <this.StartButton /> <this.StopButton /> <this.LapButton /> <this.ResetButton /><br /><br />
          <div className="LapLog" id="LapLog">
            <this.Laps />
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default Timer;
