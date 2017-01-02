import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      startTime: null,
      elapsedTime: 0,
      isRunning: false
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

  lpad = (str, padChar = '0', maxLength = 2) => {
    str += ''
    return str.length >= maxLength
      ? str
      : str + padChar.repeat(maxLength - str.length)
  }

  formatTime = (elapsedTime) => {
    const minuteInMS = 60 * 1000
    const pomoTime = 25 * minuteInMS
    const timeLeft = pomoTime - elapsedTime
    const minutes = Math.floor(timeLeft / minuteInMS)
    const seconds = Math.floor((timeLeft - minutes * minuteInMS) / 1000)
    return `${minutes}:${this.lpad(seconds)}`
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
