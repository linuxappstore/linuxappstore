import React, { Component } from "react";
import AppFooter from "./component/AppFooter";
import { CssBaseline } from "@material-ui/core";
import MiniDrawer from "./component/MiniDrawer";
import Login from "./component/Login"
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <CssBaseline />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Router>
      </React.Fragment>
    );
  }
}

function Home() {
  return (
    <React.Fragment>
      <MiniDrawer />
      <AppFooter />
    </React.Fragment>
  );
}

export default App;
