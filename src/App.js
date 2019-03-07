import React, { Component } from 'react'
import './App.scss'
import { LinuxApp } from './component/LinuxApp.js'
import { AppNavbar } from './component/AppNavbar.js'
import { AppDrawer } from './component/AppDrawer.js'
import data from './data/flathubs.json'
import { AppFooter } from './component/AppFooter';
import { CssBaseline } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
          <AppNavbar />
          <AppDrawer />
          <div className="app-grid">
            {data.map((item) => {
              return <LinuxApp data={item} />          
            })}
          </div>
          <AppFooter />
      </React.Fragment>
    );
  }
}

export default App;
