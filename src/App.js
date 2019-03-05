import React, { Component } from 'react'
import './App.css'
import { LinuxApp } from './component/LinuxApp.js'
import { AppNavbar } from './component/AppNavbar.js'
import { AppDrawer } from './component/AppDrawer.js'
import data from './data/flathubs.json'

class App extends Component {
  render() {
    return (
      <div>
          <AppNavbar />
          <AppDrawer />
          <div className="app-grid">
            {data.map((item) => {
              return <LinuxApp data={item} />          
            })}
          </div>
      </div>
    );
  }
}

export default App;
