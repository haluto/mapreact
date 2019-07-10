import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import { Select, Tabs, Checkbox } from 'antd';
import MapLoader from "./js/components/MapLoader";
import RoadPanel from "./js/components/RoadPanel";
import MapViewer from "./js/components/MapViewer";

import getXiaChenDaoLuData from "./js/localdata/xiachendaolu";
import getZhenJiDaoLuData from "./js/localdata/zhenjidaolu";
import getQuGuanDaoLuData from "./js/localdata/quguandaolu";
import getWeiYiJiaoData from "./js/localdata/weiyijiao";
import getHeDaoData from "./js/localdata/hedao";
import getLvHuaData from "./js/localdata/lvhua";

const TAB_IDX_GLOBAL_VIEW = "TabGlobalView";
const TAB_IDX_SEARCH = "TabSearch";
const TAB_IDX_DEFAULT = TAB_IDX_GLOBAL_VIEW;

const checkboxDefaultValues = ["vCheckZhenJi", "vCheckQuGuan", "vCheckXiaChen", "vCheckWeiYiJiao", "vCheckBuilding"];

class App extends Component {
  state = {
    //for search panel
    category: "XiaChenDaoLu",
    roads: [],
    showRoadInfo: false,
    roadInfo: {},

    tabIdx: TAB_IDX_DEFAULT,

    //for global view panel
    checkboxValues: checkboxDefaultValues
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
      case "QuGuanDaoLu":
      jsonFile = "./quguandaolu.json";
      break;
      case "WeiYiJiao":
      jsonFile = "./weiyijiao.json";
      break;
      case "HeDao":
      jsonFile = "./hedao.json";
      break;
      case "LvHua":
      jsonFile = "./lvhua.json";
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

    let mapArea2 = ReactDOM.findDOMNode(this.refs.mapArea2);
    mapArea2.style.width = `${(window.innerWidth)}px`;
    mapArea2.style.height = `${(window.innerHeight)}px`;
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
          case "QuGuanDaoLu":
          arr = getQuGuanDaoLuData();
          break;
          case "WeiYiJiao":
          arr = getWeiYiJiaoData();
          break;
          case "HeDao":
          arr = getHeDaoData();
          break;
          case "LvHua":
          arr = getLvHuaData();
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

  handleTabChange = (key) => {
    this.setState({tabIdx: key});
  }

  handleCheckboxChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    this.setState({checkboxValues: checkedValues});
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

        <div className="tabs-main">
          <Tabs defaultActiveKey={TAB_IDX_DEFAULT} type="card" tabPosition="right" onChange={this.handleTabChange}>
            <Tabs.TabPane tab="道路总览" key={TAB_IDX_GLOBAL_VIEW}>
              <div className="tab-global-view-panel">
                <Checkbox.Group defaultValue={checkboxDefaultValues} 
                                style={{ width: '100%' }} onChange={this.handleCheckboxChange}>
                  <div className="tab-global-view-checkbox-item">
                    <Checkbox value="vCheckZhenJi"></Checkbox>
                    <div style={{width:"40px",height:"20px",backgroundColor:"rgb(240,130,120)",marginLeft:"5px",marginRight:"5px"}}></div>
                    <div>镇级道路</div>
                  </div>
                  <div className="tab-global-view-checkbox-item">
                    <Checkbox value="vCheckQuGuan"></Checkbox>
                    <div style={{width:"40px",height:"20px",backgroundColor:"rgb(163,204,129)",marginLeft:"5px",marginRight:"5px"}}></div>
                    <div>区管道路</div>
                  </div>
                  <div className="tab-global-view-checkbox-item">
                    <Checkbox value="vCheckXiaChen"></Checkbox>
                    <div style={{width:"40px",height:"20px",backgroundColor:"rgb(124,133,183)",marginLeft:"5px",marginRight:"5px"}}></div>
                    <div>下沉道路</div>
                  </div>
                  <div className="tab-global-view-checkbox-item">
                    <Checkbox value="vCheckWeiYiJiao"></Checkbox>
                    <div style={{width:"40px",height:"20px",backgroundColor:"rgb(235,185,122)",marginLeft:"5px",marginRight:"5px"}}></div>
                    <div>未移交（在建）道路</div>
                  </div>
                  <div className="tab-global-view-checkbox-item">
                    <Checkbox value="vCheckBuilding"></Checkbox>
                    <div style={{width:"40px",height:"20px",backgroundColor:"rgb(255,255,255)",marginLeft:"5px",marginRight:"5px"}}></div>
                    <div>建筑设施</div>
                  </div>
                </Checkbox.Group>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab="道路搜索" key={TAB_IDX_SEARCH}>
              <div className="tab-search-panel">
                <div className="category-select">
                  <Select 
                    defaultValue="XiaChenDaoLu" 
                    style={{width:160}}
                    onSelect={this.handleCategorySelected}
                  >
                    <Select.Option value="XiaChenDaoLu">下沉道路</Select.Option>
                    <Select.Option value="ZhenJiDaoLu">镇级道路</Select.Option>
                    <Select.Option value="QuGuanDaoLu">区管道路</Select.Option>
                    <Select.Option value="WeiYiJiao">未移交（在建）道路</Select.Option>
                    <Select.Option value="HeDao">河道水体</Select.Option>
                    <Select.Option value="LvHua">绿化</Select.Option>
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
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>

        {/*MapViewer is for GLOBAL VIEW TAB*/}
        <div className="map-area" ref="mapArea2" hidden={!(this.state.tabIdx===TAB_IDX_GLOBAL_VIEW)}>
        <MapViewer checkedRoads={this.state.checkboxValues}/>
        </div>

        {/*RoadPanel and MapLoader are for SEARCH TAB*/}
        <RoadPanel 
          needDisplay={((this.state.showRoadInfo===true) && (this.state.tabIdx===TAB_IDX_SEARCH))}
          category={this.state.category}
          roadInfo={this.state.roadInfo}
        >
        </RoadPanel>

        <div className="map-area" ref="mapArea" hidden={!(this.state.tabIdx===TAB_IDX_SEARCH)}>
          <MapLoader category={this.state.category} roadName={this.state.roadInfo.name} />
        </div>
        {/*RoadPanel and MapLoader are for SEARCH TAB*/}
      </div>
    );
  }
}

export default App;
