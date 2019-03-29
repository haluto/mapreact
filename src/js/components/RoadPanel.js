import React from 'react';
import ReactDOM from 'react-dom';

import { Icon } from 'antd';

export default class RoadPanel extends React.Component {
  state = {
    needDisplay: false
  };

  handleRotate = () => {
    let ele = ReactDOM.findDOMNode(this.refs.roadpanelPanels);
    // set flex-direction default as "row" in css.
    if (ele.style.flexDirection === null || ele.style.flexDirection === "" || ele.style.flexDirection === "row") {
      ele.style.flexDirection = "column";
    } else if(ele.style.flexDirection === "column") {
      ele.style.flexDirection = "row";
    }
  }

  handleClose = () => {
    this.setState({needDisplay: false});
  }


  componentWillReceiveProps = (newProps) => {
    this.setState({needDisplay: newProps.needDisplay});
  }


  render = () => {
    let roadInfo = this.props.roadInfo;
    let category = this.props.category;

    let panels = [];
    if(category === "XiaChenDaoLu") {
      if(roadInfo.subroads) {
        roadInfo.subroads.map((subroad, i) => {
          panels.push(
            <div key={i} className='roadpanel-onepanel'
            >
              <div>起点：{subroad.start}</div>
              <div>终点：{subroad.end}</div>
              <div>道路等级：{subroad.level}</div>
              <div>管理单位：{subroad.owner}</div>
              <div>长（米）：{subroad.length}</div>
              <div>宽（米）：{subroad.width}</div>
              <div>面积（平方米）：{subroad.area}</div>
              <div>路灯（盏）：{subroad.lamp}</div>
              <div>养护单位：{subroad.maintain}</div>
            </div>
          );
        });
      }
    } else if(category === "ZhenJiDaoLu") {
      if(roadInfo.subroads) {
        roadInfo.subroads.map((subroad, i) => {
          panels.push(
            <div className='roadpanel-onepanel'
            >
              <div>起点：{subroad.start}</div>
              <div>终点：{subroad.end}</div>
              <div>里程（米）：{subroad.length}</div>
              <div>路基宽（米）：{subroad.width}</div>
              <div>面积（平方米）：{subroad.area}</div>
              <div>路灯（盏）：{subroad.lamp}</div>
              <div>雨水管网（米）：{subroad.rainWaterPipe}</div>
              <div>污水管网（米）：{subroad.dirtyWaterPipe}</div>
              <div>车行道（m）：{subroad.roadwayLenth}</div>
              <div>车行道面积（平方米）：{subroad.roadwayArea}</div>
              <div>人行道（m）：{subroad.sidewalkLength}</div>
              <div>人行道面积（平方米）：{subroad.sidewalkArea}</div>
              <div>进水口（只）：{subroad.waterInlet}</div>
              <div>窨井口（只）：{subroad.manhole}</div>
              <div>行道树（株）：{subroad.tree}</div>
              <div>养护单位：{subroad.maintain}</div>
            </div>
          );
        });
      }
    }

    return (
      <div className='roadpanel-container' hidden={!this.state.needDisplay}>
        <div className='roadpanel-title'>
          <div className='roadpanel-rotate' hidden={!(roadInfo.subroads && roadInfo.subroads.length>1)}
            onClick={this.handleRotate}
          >
            <Icon type="retweet" />
          </div>
          <div className='roadpanel-close' onClick={this.handleClose}>
            <Icon type="close-square" />
          </div>
          {roadInfo.name}
        </div>
        <div className='roadpanel-panels' ref='roadpanelPanels'>
          {panels}
        </div>
      </div>
    );
  }
}