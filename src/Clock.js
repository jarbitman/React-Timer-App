import React from 'react';
import {padNumber} from './helpers.js'

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
      currentTime: this.formatDateTime(new Date())
    }));
  }

  formatDateTime = (currDateTime) => {
    const dateFields = {
      'MM': padNumber(currDateTime.getMonth() + 1),
      'M': currDateTime.getMonth() + 1,
      'DD': padNumber(currDateTime.getDate()),
      'D': currDateTime.getDate(),
      'YYYY': currDateTime.getFullYear(),
      'YY': currDateTime.getFullYear() - 2000,
      'hh': padNumber(currDateTime.getHours()),
      'h': currDateTime.getHours(),
      'i': (currDateTime.getHours() > 12) ? currDateTime.getHours() % 12 : currDateTime.getHours(),
      'I': padNumber((currDateTime.getHours() > 12) ? currDateTime.getHours() % 12 : currDateTime.getHours(), 2),
      'mm': padNumber(currDateTime.getMinutes()),
      'm': currDateTime.getMinutes(),
      'ss': padNumber(currDateTime.getSeconds()),
      's': currDateTime.getSeconds(),
      'a': (currDateTime.getHours() < 12) ? 'am' : 'pm',
      'A': (currDateTime.getHours() < 12) ? 'AM' : 'PM',
    }

    let formattedDateTime = this.state.dateTimeFormat.replace(/([a-zA-Z]+)/g, (field) => {
      if (typeof(dateFields[field]) !== 'undefined') {
        return dateFields[field];
      } else {
        return field;
      }
    });

    return formattedDateTime;
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
