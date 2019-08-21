import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {starts: [], stops: [], isRunning: false, laps: [], interval: null};
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
      laps: [...this.state.laps, this.formatTime(this.getCurrentTime())]
    }))
  }

  reset = () => {
    this.stopTimer();
    this.setState(() => ({
      laps: [],
      starts: [],
      stops: [],
    }));
  }

  getStartButton = () => {
    if (!this.state.isRunning) {
      return (<button onClick={this.startTimer}>Start</button>)
    } else {
      return '';
    }
  }

  getStopButton = () => {
    if (this.state.isRunning) {
      return (<button onClick={this.stopTimer}>Stop</button>)
    } else {
      return '';
    }
  }

  getLapButton = () => {
    if (this.state.isRunning) {
      return (<button onClick={this.lap}>Lap</button>)
    }
  }

  getResetButton = () => {
    if (this.state.starts.length) {
      return (<button onClick={this.reset}>Reset</button>)
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

  padNumber = (number) => {
    return (number < 10 ? '0' : '') + number
  }

  formatTime = (time) => {
    let remTime = time/1000;
    const hr = Math.floor(remTime / 3600);
    remTime = remTime - hr * 3600;
    const min = Math.floor(remTime / 60);
    remTime = remTime - min * 60;
    const sec = remTime;
    return this.padNumber(hr) + ":" + this.padNumber(min) + ":" + this.padNumber(sec.toFixed(3));
  }

  getLaps = () => {
    return this.state.laps.map(
      (lapTime, i) => <div class="lap" key="lap{i+1}">Lap {i+1}: {lapTime}</div>
    );
  }

  render = () => {
    return (
      <div>
        {this.formatTime(this.getCurrentTime())}<br /><br />
        {this.getStartButton()} {this.getStopButton()} {this.getLapButton()} {this.getResetButton()}<br /><br />
        {this.getLaps()}
      </div>
    );
  }
}

export default Timer;
