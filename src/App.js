import React, { Component } from 'react';
import './App.css';
import { LinuxApp } from './component/LinuxApp.js'
import data from './data/flathubs.json'

class App extends Component {
  render() {
    return (
      <div>
          {data.map((item) => {
            return <LinuxApp data={item} />          
          })}
      </div>
    );
  }
}

export default App;
