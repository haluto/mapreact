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
              <div>长（米）：{subroad.length}</div>
              <div>宽（米）：{subroad.width}</div>
              <div>道路等级：{subroad.level}</div>
              <div>管理单位：{subroad.owner}</div>
              <div>养护单位：{subroad.maintain}</div>
              <div>路灯（盏）：{subroad.lamp}</div>
              <div>雨污水井（个）：{subroad.waterInlet}</div>
              <div>行道树（株）：{subroad.tree}</div>
            </div>
          );
          return i;
        });
      }
    } else if(category === "ZhenJiDaoLu") {
      if(roadInfo.subroads) {
        roadInfo.subroads.map((subroad, i) => {

          // 农贸市场
          let nongMaoElement = [];
          if (subroad.nongMaoShiChang) {
            nongMaoElement.push(<div style={{float: 'left'}}><b>农贸市场：</b></div>); // title
            nongMaoElement.push(<br />);
            subroad.nongMaoShiChang.map((subNongMao, a) => {
              nongMaoElement.push(
                <div key={a} style={{borderBottom: "1px solid rgb(200,200,200)"}}> 
                  <div style={{float: 'left'}}>菜市场名称：{subNongMao.name}</div> <br />
                  <div style={{float: 'left'}}>经营面积：{subNongMao.area}</div> <br />
                  <div style={{float: 'left'}}>总摊位数：{subNongMao.number}</div> <br />
                  <div style={{float: 'left'}}>垃圾清运单位： {subNongMao.trash}</div> <br />
                </div>
              );
              return a;
            });
          }
          // 居民区
          let juMinQuElement = [];
          if (subroad.juMinQu) {
            juMinQuElement.push(<div style={{float: 'left'}}><b>居民区：</b></div>); // title
            juMinQuElement.push(<br />);
            subroad.juMinQu.map((subJuMinQu, b) => {
              juMinQuElement.push(
                <div key={b} style={{borderBottom: "1px solid rgb(200,200,200)"}}>
                  <div style={{float: 'left'}}>居委名称：{subJuMinQu.name}</div> <br />
                  <div style={{float: 'left'}}>户数：{subJuMinQu.number}</div> <br />
                  <div style={{float: 'left'}}>四至边界：{subJuMinQu.side}</div> <br />
                  <div style={{float: 'left'}}>所辖小区：{subJuMinQu.district}</div> <br />
                </div>
              );
              return b;
            });
          }
          // 公共设施
          let gongGongSheShiElement = [];
          if (subroad.gongGongSheShi) {
            gongGongSheShiElement.push(<div style={{float: 'left'}}><b>公共设施：</b></div>); // title
            gongGongSheShiElement.push(<br />);
            subroad.gongGongSheShi.map((subSheShi, c) => {
              gongGongSheShiElement.push(
                <div key={c} style={{borderBottom: "1px solid rgb(200,200,200)"}}>
                  <div style={{float: 'left'}}>名称：{subSheShi.name}</div> <br />
                  <div style={{float: 'left'}}>面积（m2）：{subSheShi.area}</div> <br />
                  <div style={{float: 'left'}}>养护单位：{subSheShi.maintain}</div> <br />
                </div>
              );
              return c;
            });
          }
          // 公交线路
          let gongJiaoXianLuElement = [];
          if (subroad.gongJiaoXianLu) {
            gongJiaoXianLuElement.push(<div style={{float: 'left'}}><b>公交线路：</b></div>); // title
            gongJiaoXianLuElement.push(<br />);
            subroad.gongJiaoXianLu.map((subGongJiao, d) => {
              gongJiaoXianLuElement.push(
                <div key={d} style={{borderBottom: "1px solid rgb(200,200,200)"}}>
                  <div style={{float: 'left'}}>线路名称：{subGongJiao.name}</div> <br />
                  <div style={{float: 'left'}}>站点数量：{subGongJiao.number}</div> <br />
                  <div style={{float: 'left'}}>站点名称：{subGongJiao.portName}</div> <br />
                </div>
              );
              return d;
            });
          }
          // total element with basic infos.
          panels.push(
            <div key={i} className='roadpanel-onepanel'
            >
              <div style={{float: 'left'}}>起点：{subroad.start}</div> <br />
              <div style={{float: 'left'}}>终点：{subroad.end}</div> <br />
              <div style={{float: 'left'}}>长（米）：{subroad.length}</div> <br />
              <div style={{float: 'left'}}>宽（米）：{subroad.width}</div> <br />
              <div style={{float: 'left'}}>道路等级：{subroad.level}</div> <br />
              <div style={{float: 'left'}}>管理单位：{subroad.owner}</div> <br />
              <div style={{float: 'left'}}>养护单位：{subroad.maintain}</div> <br />
              <div style={{float: 'left'}}>路灯（盏）：{subroad.lamp}</div> <br />
              <div style={{float: 'left'}}>雨污水井（个）：{subroad.waterInlet}</div> <br />
              <div style={{float: 'left'}}>行道树（株）：{subroad.tree}</div> <br />
              <br />
              {nongMaoElement}
              <br />
              {juMinQuElement}
              <br />
              {gongGongSheShiElement}
              <br />
              {gongJiaoXianLuElement}
            </div>
          );
          return i;
        });
      }
    } else if(category === "QuGuanDaoLu") {
      if(roadInfo.subroads) {
        roadInfo.subroads.map((subroad, i) => {
          panels.push(
            <div key={i} className='roadpanel-onepanel'
            >
              <div>起点：{subroad.start}</div>
              <div>终点：{subroad.end}</div>
              <div>长（米）：{subroad.length}</div>
              <div>宽（米）：{subroad.width}</div>
              <div>道路等级：{subroad.level}</div>
              <div>管理单位：{subroad.owner}</div>
              <div>养护单位：{subroad.maintain}</div>
              <div>路灯（盏）：{subroad.lamp}</div>
              <div>雨污水井（个）：{subroad.waterInlet}</div>
              <div>行道树（株）：{subroad.tree}</div>
            </div>
          );
          return i;
        });
      }
    } else if(category === "WeiYiJiao") {
      if(roadInfo.subroads) {
        roadInfo.subroads.map((subroad, i) => {
          panels.push(
            <div key={i} className='roadpanel-onepanel'
            >
              <div>起点：{subroad.start}</div>
              <div>终点：{subroad.end}</div>
              <div>长（米）：{subroad.length}</div>
              <div>宽（米）：{subroad.width}</div>
              <div>道路等级：{subroad.level}</div>
              <div>管理单位：{subroad.owner}</div>
              <div>养护单位：{subroad.maintain}</div>
              <div>路灯（盏）：{subroad.lamp}</div>
              <div>雨污水井（个）：{subroad.waterInlet}</div>
              <div>行道树（株）：{subroad.tree}</div>
            </div>
          );
          return i;
        });
      }
    } else if(category === "HeDao") {
      if(roadInfo.subroads) {
        roadInfo.subroads.map((subroad, i) => {
          panels.push(
            <div key={i} className='roadpanel-onepanel'
            >
              <div>序号：{roadInfo.index}</div>
              <div>分镇编码：{roadInfo.code}</div>
              <div>管理等级：{subroad.level}</div>
              <div>空间长度：{subroad.length}</div>
              <div>空间面积：{subroad.area}</div>
              <div>是否跨镇：{subroad.overtown}</div>
              <div>流经街镇：{subroad.towns}</div>
              <div>水体分类：{subroad.class}</div>
              <div>是否管控：{subroad.control}</div>
              <div>起点：{subroad.start}</div>
              <div>终点：{subroad.end}</div>
              <div>所属街镇：{subroad.ownertown}</div>
            </div>
          );
          return i;
        });
      }
    } else if(category === "LvHua") {
      if(roadInfo.subroads) {
        roadInfo.subroads.map((subroad, i) => {
          panels.push(
            <div key={i} className='roadpanel-onepanel'
            >
              <div>面积（m2）：{subroad.area}</div>
              <div>养护单位：{subroad.maintain}</div>
            </div>
          );
          return i;
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
          <div className='roadpanel-title-text'>{roadInfo.name}</div>
        </div>
        <div className='roadpanel-panels' ref='roadpanelPanels'>
          {panels}
        </div>
      </div>
    );
  }
}