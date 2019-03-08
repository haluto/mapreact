import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Input } from 'antd';
import MapLoader from "./js/components/MapLoader";

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="head-bar">
          <Input.Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value=>console.log(value)}
            style={{ width: 200 }}
          />
        </div>

        <div className="map-area">
          <MapLoader />
        </div>
      </div>
    );
  }
}

export default App;
