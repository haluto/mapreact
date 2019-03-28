import React from 'react';
import ReactDOM from 'react-dom';

import { Card, Col, Row } from 'antd';

export default class RoadPanel extends React.Component {

  render = () => {
    let roadInfo = this.props.roadInfo;

    let panels = [];
    if(roadInfo.subroads) {
      roadInfo.subroads.map((subroad, i) => {
        panels.push(
          <div className='roadpanel-onepanel'
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

    return (
      <div className='roadpanel-container' hidden={!this.props.needDisplay}>
        <div className='roadpanel-title'>道路名称：{roadInfo.name}</div>
        <div className='roadpanel-panels'>
          {panels}
        </div>
      </div>
    );
  }
}