import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TemperatureLineChart } from './components'

class App extends Component {

  data = [
    { name: 'Page A', temp: 4000 },
    { name: 'Page B', temp: 3000 },
    { name: 'Page C', temp: 2000 },
    { name: 'Page D', temp: 2780 },
    { name: 'Page E', temp: 1890 },
    { name: 'Page F', temp: 2390 },
    { name: 'Page G', temp: 3490 },
  ];

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <TemperatureLineChart />
      </div>
    );
  }
}

export default App;
