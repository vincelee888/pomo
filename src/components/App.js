import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

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

  lpad = (str, padChar = '0', maxLength = 2) => {
    str += ''
    return str.length >= maxLength
      ? str
      : str + padChar.repeat(maxLength - str.length)
  }

  formatTime = (elapsedTime) => {
    const msInSecond = 1000
    const msInMinute = 60 * msInSecond
    const pomoTime = this.state.pomoDurationInMinutes * msInMinute
    const timeLeft = pomoTime - elapsedTime
    const minutes = Math.floor(timeLeft / msInMinute)
    const seconds = Math.floor((timeLeft - minutes * msInMinute) / msInSecond)
    return `${this.lpad(minutes)}:${this.lpad(seconds)}`
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
