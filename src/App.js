import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    data: [
      {
        "title": "Discord",
        "package_name": "discord",
        "icon_url": "https://dashboard.snapcraft.io/site_media/appmedia/2017/04/discord.png",
        "license": "Proprietary",
        "version": "0.0.8"
      }
    ]
  }

  render() {
    return (
      <div className="App">
      <h3>{this.state.data[0].title}</h3>
        <img style={{width: "96px"}} src={this.state.data[0].icon_url} alt={"test"}></img>
      </div>
    );
  }
}

export default App;
