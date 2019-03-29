import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { Select, notification, Icon } from 'antd';
import MapLoader from "./js/components/MapLoader";
import RoadPanel from "./js/components/RoadPanel";

class App extends Component {
  state = {
    roads: [],
    showRoadInfo: false,
    roadInfo: {}
  };

  handleSelectSelected = (value) => {
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
      this.setState({showRoadInfo: true,
                    roadInfo: this.state.roads[i]});
    }
  }

  handleWindowResize = () => {
    console.log(window.innerWidth);

    let mapArea = ReactDOM.findDOMNode(this.refs.mapArea);
    mapArea.style.width = `${(window.innerWidth)}px`;
    mapArea.style.height = `${(window.innerHeight)}px`;
  }

  componentDidMount = () => {
    console.log("componentDidMount");
    // TODO: if open index.html with browser, without a server, browsers don't support read local file.
    // FileReader need input element to get the file.
    fetch("./road.json")
      .then(res => res.json())
      .then(json => {this.setState({roads: json.roads});console.log("JSON FILE INFO:", json.roads)});
    
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

        <div className="search-bar">
          <Select
            showSearch
            style={{width:300}}
            placeholder="请输入路名"
            onSelect={this.handleSelectSelected}
          >
            {roadItems}
          </Select>
        </div>
        <RoadPanel 
          needDisplay={this.state.showRoadInfo}
          roadInfo={this.state.roadInfo}
        >
        </RoadPanel>

        <div className="map-area" ref="mapArea">
          <MapLoader roadName={this.state.roadInfo.name} />
        </div>
      </div>
    );
  }
}

export default App;
