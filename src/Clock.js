import React from 'react';
import {padNumber} from './helpers.js'

class Clock extends React.Component {
  state = {
    currentTime: '',
    dateTimeFormat: 'MM-DD-YYYY hh:mm:ss'
  };

  constructor(props) {
    super(props);
    setInterval(this.UpdateTime, 1000);
  }

  setFormat = (format) => {
    this.setState((prevState) => ({
      timeFormat: format
    }))
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
      'hh': padNumber(currDateTime.getHours()),
      'h': currDateTime.getHours(),
      'mm': padNumber(currDateTime.getMinutes()),
      'm': currDateTime.getMinutes(),
      'ss': padNumber(currDateTime.getSeconds()),
      's': currDateTime.getSeconds(),
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
