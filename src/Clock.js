import React from 'react';
import {formatDateTime} from './helpers.js'

class Clock extends React.Component {
  state = {
    currentTime: '',
    dateTimeFormat: 'MM-DD-YYYY hh:mm:ss',
    interval: null,
  };

  constructor(props) {
    super(props);

    if (props.format) {
      this.state.dateTimeFormat = this.props.format;
    }

    this.state.interval = setInterval(this.UpdateTime, 1000);
  }

  setFormat = (format) => {
    this.setState((prevState) => ({
      dateTimeFormat: format
    }));
  }

  CurrentTime = () =>
    this.state.currentTime;

  UpdateTime = () => {
    this.setState((prevState) => ({
      currentTime: formatDateTime(this.state.dateTimeFormat, new Date())
    }));
  }

  render = () => {
    return (
      <div className="Clock">
        <this.CurrentTime />
      </div>
    )
  }

}

export default Clock;
