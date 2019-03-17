import React, { Component } from 'react';
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
        <div>
          <div>
            <SearchBox />
          </div>
          <div className="inner">
            <p>Users</p>
            <div key={this.state.username}>{this.state.username}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
