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
        <button onClick={ this.startPomo }>{ buttonText }</button>
      </div>
    );
  }
}

export default App;
