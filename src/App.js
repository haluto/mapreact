import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

  handleWindowResize = () => {
    console.log(window.innerWidth);

    let mapArea = ReactDOM.findDOMNode(this.refs.mapArea);
    mapArea.style.width = `${(window.innerWidth)}px`;
    mapArea.style.height = `${(window.innerHeight)}px`;
  }

  componentDidMount = () => {
    fetch("./road.json")
     .then(res => res.json())
     .then(json => this.setState({roads: json.roads}));

     this.handleWindowResize();
     window.addEventListener('resize', this.handleWindowResize);
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleWindowResize);
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

        <div className="map-area" ref="mapArea">
          <MapLoader />
        </div>
      </div>
    );
  }
}

export default App;
