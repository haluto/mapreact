import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { Select } from 'antd';
import MapLoader from "./js/components/MapLoader";
import RoadPanel from "./js/components/RoadPanel";

import getXiaChenDaoLuData from "./js/localdata/xiachendaolu";
import getZhenJiDaoLuData from "./js/localdata/zhenjidaolu";

class App extends Component {
  state = {
    category: "XiaChenDaoLu",
    roads: [],
    showRoadInfo: false,
    roadInfo: {}
  };

  handleCategorySelected = (value) => {
    let jsonFile = "";

    switch(value) {
      case "XiaChenDaoLu":
      jsonFile = "./xiachendaolu.json";
      break;
      case "ZhenJiDaoLu":
      jsonFile = "./zhenjidaolu.json";
      break;
      default:
      jsonFile = "./xiachendaolu.json";
      break;
    }

    this.fetchData(jsonFile, value, false);
  }

  handleSearchBarSelected = (value) => {
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

  /**
   * fetchData
   */
  fetchData = (jsonFile, category, showRoadInfo) => {
    fetch(jsonFile)
      .then((res) => {
        console.log("fetch data from config files.");
        res.json().then(json => {
          this.setState({roads: json.roads, category: category, showRoadInfo:showRoadInfo});
        });
      }, () => {
        console.log("fetch data from array.");
        let arr = {};
        switch(category) {
          case "XiaChenDaoLu":
          arr = getXiaChenDaoLuData();
          break;
          case "ZhenJiDaoLu":
          arr = getZhenJiDaoLuData();
          break;
          default:
          break;
        }
        this.setState({roads: arr.roads, category: category, showRoadInfo:showRoadInfo});
      });
  }


  componentDidMount = () => {
    console.log("componentDidMount");
    
    this.fetchData("./xiachendaolu.json", "XiaChenDaoLu", false);
    
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

        <div className="category-select">
          <Select 
            defaultValue="XiaChenDaoLu" 
            style={{width:100}}
            onSelect={this.handleCategorySelected}
          >
            <Select.Option value="XiaChenDaoLu">下沉道路</Select.Option>
            <Select.Option value="ZhenJiDaoLu">镇级道路</Select.Option>
          </Select>
        </div>
        <div className="search-bar">
          <Select
            showSearch
            style={{width:300}}
            placeholder="请输入路名"
            onSelect={this.handleSearchBarSelected}
          >
            {roadItems}
          </Select>
        </div>
        <RoadPanel 
          needDisplay={this.state.showRoadInfo}
          category={this.state.category}
          roadInfo={this.state.roadInfo}
        >
        </RoadPanel>

        <div className="map-area" ref="mapArea">
          <MapLoader category={this.state.category} roadName={this.state.roadInfo.name} />
        </div>
      </div>
    );
  }
}

export default App;
