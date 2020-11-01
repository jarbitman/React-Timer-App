import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import {FaTrashAlt, FaClock, FaPlus} from 'react-icons/fa';
import {formatDateTime, padNumber} from '../helpers.js';

class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alarms: [],
      timeouts: [],
      isVisible: false,
      currentAlarm: new Date(),
      dingSound: 'ding.mp3',
      alarmFormat: 'MM-DD-YYYY i:mm:ss a',
      player: null
    };
  }

  CurrentAlarms = () => {
    let padAlarmsTo = ("" + this.state.alarms.length).length;
    return <ul>
    {this.state.alarms.map((alarm, i) => {
      return (
        <li key={i} className="alarm" alarmtime={alarm.toString()}>
          <FaClock /> Alarm {padNumber(i + 1, padAlarmsTo)}: {formatDateTime(this.state.alarmFormat, alarm)} <FaTrashAlt onClick={this.deleteAlarm} />
        </li>
      )
    })}
      </ul>
  }

  updateAlarmTime = (date) => {
    this.setState({
      currentAlarm: date
    });
  }

  addAlarm = () => {
    if (this.state.alarms.indexOf(this.state.currentAlarm) === -1) {
      this.player.src = this.state.dingSound;
      this.setState((prevState) => ({
        alarms: [...prevState.alarms, prevState.currentAlarm],
        timeouts: [...prevState.timeouts, setTimeout(() => {this.alertUser()}, prevState.currentAlarm - new Date())],
      }));
    } else {
      console.log("not going to add a duplicate alarm");
    }
  }

  filterAlarmArray = (alarms, timeouts, itemToRemove) => {
    let newAlarms = [];
    let newTimeouts = [];

    for(let i = 0; i < alarms.length; i++) {
      if (alarms[i].toString() !== itemToRemove.toString()) {
        newAlarms.push(alarms[i]);
        newTimeouts.push(timeouts[i]);
      } else {
        clearTimeout(timeouts[i]);
      }
    }
    return [newAlarms, newTimeouts];
  }

  deleteAlarm = (e) => {
    const [alarms, timeouts] = this.filterAlarmArray(this.state.alarms, this.state.timeouts, e.target.closest(".alarm").attributes.alarmtime.value);
    this.setState(() => ({
      alarms: alarms,
      timeouts: timeouts
    }));
  }

  alertUser = () => {
    const [alarms, timeouts] = this.filterAlarmArray(this.state.alarms, this.state.timeouts, new Date().toString());
    this.setState(() => ({
      alarms: alarms,
      timeouts: timeouts
    }));
    this.player.play();
    console.log('playing ding');
  }

  setVisibility = (newVisibility) => {
    this.setState({
      isVisible: newVisibility,
    });
  }

  isVisible = () => {
    return this.state.isVisible;
  }

  render = () => {
    const player = <audio ref={(ref) => {this.player = ref;}} />;
    if (this.state.isVisible) {
      return (
        <div>
          <DateTimePicker onChange={this.updateAlarmTime} value={this.state.currentAlarm} calendarType="Hebrew" /> <FaPlus onClick={this.addAlarm} />
          <div className="AlarmLog" id="AlarmLog">
            <this.CurrentAlarms />
          </div>
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

export default Alarm;
