import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import { lpad } from '../helpers/string'
import { msInMinute, msInSecond } from '../helpers/time'

class App extends Component {
  constructor() {
    super()
    this.state = {
      startTime: null,
      elapsedTime: 0,
      isRunning: false,
      pomoDurationInMinutes: 25
    }
  }

  startPomo = () => {
    this.setState({
      startTime: new Date(),
      isRunning: true
    })

    setInterval(() => {
      const elapsedTime = Date.now() - this.state.startTime
      this.setState({elapsedTime})
    }, 100)
  }

  formatTime = (elapsedTime) => {
    const pomoTime = this.state.pomoDurationInMinutes * msInMinute
    const timeLeft = pomoTime - elapsedTime
    const minutes = Math.floor(timeLeft / msInMinute)
    const seconds = Math.floor((timeLeft - minutes * msInMinute) / msInSecond)
    return `${lpad(minutes)}:${lpad(seconds)}`
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Pomo</h2>
          <h3>{this.formatTime(this.state.elapsedTime)}</h3>
        </div>
        <button onClick={this.startPomo}>Start Pomo</button>
      </div>
    );
  }
}

export default App;
