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
    running: 1
  }

  getPomoState = () => {
    if (this.state.isRunning) return this.pomoState.running
    return this.pomoState.notStarted    
  }

  togglePomo = () => {
    console.log(this.getPomoState(), this.pomoState.running)
    if (this.getPomoState() === this.pomoState.running) {
      window.clearInterval(this.state.timer)
      this.setState({
        timer: null,
        isRunning: false
      })
    } else if (this.state.startTime) {
      this.setState({
        isRunning: true,
        timer: this.getNewTimer()
      })
    } else {
      this.setState({
        startTime: new Date(),
        isRunning: true,
        timer: this.getNewTimer()
      })
    }
  }

  getTimeLeft = () => {
    const pomoTime = this.state.pomoDurationInMinutes * msInMinute
    return pomoTime - this.state.elapsedTime
  }

  render() {
    const buttonText = this.state.isRunning
      ? 'Pause'
      : 'Start Pomo'
    
    const elapsedTime = formatTime(this.getTimeLeft())
      
    return (
      <div className="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>Welcome to Pomo</h2>
          <h3>{ elapsedTime }</h3>
        </div>
        <button onClick={ this.togglePomo }>{ buttonText }</button>
      </div>
    );
  }
}

export default App;
