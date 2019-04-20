import React, { Component } from 'react';
import SearchBox from './js/search.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <div className="App">
        <div>
          <SearchBox />
        </div>
      </div>
    );
  }
}

export default App;
