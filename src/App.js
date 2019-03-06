import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MapLoader from "./js/components/MapLoader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapLoader />
      </div>
    );
  }
}

export default App;
