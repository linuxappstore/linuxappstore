import React, { Component } from 'react'
import './App.scss'
import { AppFooter } from './component/AppFooter';
import { CssBaseline } from '@material-ui/core';
import MiniDrawer from './component/MiniDrawer';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MiniDrawer />
        <AppFooter />
      </React.Fragment>
    );
  }
}

export default App;
