import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { Select, notification, Icon } from 'antd';
import MapLoader from "./js/components/MapLoader";

class App extends Component {
  state = {
    roads: []
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
      console.log(this.state.roads[i].desc);
      notification.close("road-info-notification");
      notification.open({
        key: "road-info-notification",
        message: this.state.roads[i].name,
        description: this.state.roads[i].desc,
        duration: 0,
        //placement: 'topRight',
        style: {
          position: 'absolute',
          top: 45,
          right: 30,
        },
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
      });
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

        <div className="head-bar">
          <Select
            showSearch
            style={{width:300}}
            placeholder="请输入路名"
            onSelect={this.handleSelectSelected}
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
