import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import { formatTime, msInMinute, msInSecond } from '../helpers/time'

class App extends Component {
  constructor() {
    super()
    this.state = {
      hasStarted: false,
      elapsedTime: 0,
      isRunning: false,
      isOnBreak: false,
      pomoDurationInMinutes: 25,
      breakDurationInMinutes: 5,
      timer: null
    }
  }

  timeIsUp = (time) => {
    const pomoTimeIsUp = () => time > this.state.pomoDurationInMinutes * msInMinute
    const breakTimeIsUp = () => time > this.state.breakDurationInMinutes * msInMinute
    
    return this.state.isOnBreak
      ? breakTimeIsUp()
      : pomoTimeIsUp()
  }

  getNewTimer = () => {
    return window.setInterval(() => {
      const elapsedTime = this.state.elapsedTime + msInSecond

      if (this.timeIsUp(elapsedTime)) {
        this.setState({
          elapsedTime: 0,
          isOnBreak: !this.state.isOnBreak
        })
      } else {
        this.setState({ elapsedTime })
      }
    }, msInSecond)
  }

  pomoState = {
    notStarted: 0,
    running: 1,
    paused: 2,
    onBreak: 3
  }

  getPomoState = () => {
    if (this.state.isRunning) return this.pomoState.running
    if (!this.state.isRunning && this.state.hasStarted) return this.pomoState.paused
    return this.pomoState.notStarted    
  }

  start = () => {
    this.setState({
      hasStarted: true,
      isRunning: true,
      timer: this.getNewTimer()
    })
  }

  pause = () => {
    window.clearInterval(this.state.timer)
    this.setState({
      timer: null,
      isRunning: false
    })
  }

  unpause = () => {
    this.setState({
      isRunning: true,
      timer: this.getNewTimer()
    })
  }

  togglePomo = () => {
    if (this.getPomoState() === this.pomoState.running) this.pause()
    if (this.getPomoState() === this.pomoState.paused) this.unpause()
    if (this.getPomoState() === this.pomoState.notStarted) this.start()
  }

  reset = () => {
    this.pause()
    this.setState({
      hasStarted: false,
      elapsedTime: 0,
      isOnBreak: false
    })
  }

  getTimeLeft = () => {
    const pomoTime = this.state.isOnBreak
      ? this.state.breakDurationInMinutes * msInMinute
      : this.state.pomoDurationInMinutes * msInMinute
    return pomoTime - this.state.elapsedTime
  }

  getButtonText = () => {
    if (this.getPomoState() === this.pomoState.running) return 'Pause'
    if (this.getPomoState() === this.pomoState.paused) return 'Resume'
    if (this.getPomoState() === this.pomoState.notStarted) return 'Start'
  }

  getAppClass = () => {
    const base = 'App'
    return this.state.isOnBreak
      ? `${base} break-time`
      : base
  }

  render() {
    return (
      <div className={this.getAppClass()}>
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>Welcome to Pomo</h2>
          <h3>{ formatTime(this.getTimeLeft()) }</h3>
        </div>
        <button onClick={ this.togglePomo }>{ this.getButtonText() }</button>
        <button onClick={ this.reset }>Reset</button>
      </div>
    );
  }
}

export default App;
