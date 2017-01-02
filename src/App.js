import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      startTime: null,
      elapsedTime: null,
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Pomo</h2>
          <h3>{this.state.elapsedTime}</h3>
        </div>
        <button onClick={this.startPomo}>Start Pomo</button>
      </div>
    );
  }
}

export default App;
