import React, { Component } from 'react'
import './App.css'
import { LinuxApp } from './component/LinuxApp.js'
import { AppNavbar } from './component/AppNavbar.js'
import data from './data/flathubs.json'

class App extends Component {
  render() {
    return (
      <div>
          <AppNavbar />
          {data.map((item) => {
            return <LinuxApp data={item} />          
          })}
      </div>
    );
  }
}

export default App;
