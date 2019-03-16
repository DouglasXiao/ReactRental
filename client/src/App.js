import React, { Component } from 'react';
import MapContainer from './js/mapContainer.js';
import SearchBox from './js/search.js';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {username: ""};
  }

  componentDidMount() {
    console.log("componentDidMount");
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  handleClick() {
    console.log("on enter");
  }
  render() {
    return (
      <div className="App">
        <div className="left">
          <SearchBox />
          <div className="inner">
            <h1>Users</h1>
            <div key={this.state.username}>{this.state.username}</div>
          </div>
        </div>
        <div className="right">
          <MapContainer />
        </div>
      </div>
    );
  }
}

export default App;
