import React, { Component } from 'react';
import './App.css';

import { Select } from 'antd';
import MapLoader from "./js/components/MapLoader";

class App extends Component {
  state = {
    roads: []
  };

  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    let i=0;
    let found = false;

    for(i=0; i<this.state.roads.length; i++) {
      if(this.state.roads[i].name === value) {
        found = true;
        break;
      }
    }
    if(found === true) {
      console.log(this.state.roads[i].desc);
    }
  }

  componentDidMount = () => {
    console.log("componentWillMount");
    fetch("./road.json")
     .then(res => res.json())
     .then(json => this.setState({roads: json.roads}));
  }

  render() {
    let roadItems = [];
    this.state.roads.map((road, i) => {
      roadItems.push(
        <Select.Option key={i} value={road.name}>{road.name}</Select.Option>
      );
      return i;
    });

    return (
      <div className="App">

        <div className="head-bar">
          <Select
            showSearch
            style={{width:300}}
            placeholder="请输入路名"
            onChange={this.handleSelectChange}
          >
            {roadItems}
          </Select>
        </div>

        <div className="map-area">
          <MapLoader />
        </div>
      </div>
    );
  }
}

export default App;
