import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import { formatTime, msInMinute } from '../helpers/time'

class App extends Component {
  constructor() {
    super()
    this.state = {
      startTime: null,
      elapsedTime: 0,
      isRunning: false,
      pomoDurationInMinutes: 25,
      timer: null
    }
  }

  getNewTimer = () => {
    return window.setInterval(() => {
      this.setState({
        elapsedTime: this.state.elapsedTime + 1000
      })
    }, 1000)
  }

  pomoState = {
    notStarted: 0,
    running: 1,
    paused: 2
  }

  getPomoState = () => {
    if (this.state.isRunning) return this.pomoState.running
    if (!this.state.isRunning && this.state.startTime) return this.pomoState.paused
    return this.pomoState.notStarted    
  }

  start = () => {
    this.setState({
      startTime: new Date(),
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

  getTimeLeft = () => {
    const pomoTime = this.state.pomoDurationInMinutes * msInMinute
    return pomoTime - this.state.elapsedTime
  }

  getButtonText = () => {
    if (this.getPomoState() === this.pomoState.running) return 'Pause'
    if (this.getPomoState() === this.pomoState.paused) return 'Resume'
    if (this.getPomoState() === this.pomoState.notStarted) return 'Start'
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>Welcome to Pomo</h2>
          <h3>{ formatTime(this.getTimeLeft()) }</h3>
        </div>
        <button onClick={ this.togglePomo }>{ this.getButtonText() }</button>
      </div>
    );
  }
}

export default App;
