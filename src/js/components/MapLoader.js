import React from 'react';
import ReactDOM from 'react-dom';

import MapImage from "./icon/map.jpg";
// 下沉道路
import xcTingAnLu from "./icon/xiachendaolu/庭安路.jpg";  //1
import xcBaiXuanLu from "./icon/xiachendaolu/白萱路.jpg"; //2
import xcQiuLanLu from "./icon/xiachendaolu/秋岚路.jpg";  //3
import xcLanGuLu from "./icon/xiachendaolu/兰谷路.jpg";  //4
import xcLanSongLu from "./icon/xiachendaolu/兰嵩路.jpg"; //5
import xcLaiYangLu from "./icon/xiachendaolu/莱阳路.jpg"; //6
import xcDongXuLu from "./icon/xiachendaolu/东煦路.jpg"; //7
import xcFanJinLu from "./icon/xiachendaolu/繁锦路.jpg"; //8
import xcDieYiLu from "./icon/xiachendaolu/蝶衣路.jpg"; //9
import xcFangFeiLu from "./icon/xiachendaolu/芳菲路.jpg"; //10
import xcZiYiLu from "./icon/xiachendaolu/紫衣路.jpg"; //11
import xcQiFanLu from "./icon/xiachendaolu/启帆路.jpg"; //12
import xcLanQiaoLu from "./icon/xiachendaolu/兰桥路.jpg"; //13
import xcFangMeiLu from "./icon/xiachendaolu/芳湄路.jpg"; //14
import xcJinHangLu from "./icon/xiachendaolu/津行路.jpg"; //15
import xcJuFengLu from "./icon/xiachendaolu/巨峰路.jpg"; //16
import xcDongGaoLu from "./icon/xiachendaolu/东高路.jpg"; //17
import xcDeAiLu from "./icon/xiachendaolu/德爱路.jpg"; //18
import xcXieAnLu from "./icon/xiachendaolu/谐安路.jpg"; //19
import xcZhenTingLu from "./icon/xiachendaolu/振庭路.jpg"; //20
import xcHengAnLu from "./icon/xiachendaolu/衡安路.jpg"; //21
import xcJinJingLu from "./icon/xiachendaolu/金京路.jpg"; //22
// 镇级道路
import zjDongGaoLu from "./icon/zhenjidaolu/东高路.jpg"; //1
import zjDongGouLu from "./icon/zhenjidaolu/东沟路.jpg"; //2
import zjGaoHangJie from "./icon/zhenjidaolu/高行街.jpg"; //3
import zjGaoXiZhongXinLu from "./icon/zhenjidaolu/高西中心路.jpg"; //4
import zjGuiHuaYiLu from "./icon/zhenjidaolu/规划一路.jpg"; //5
import zjHangDeLu from "./icon/zhenjidaolu/行德路.jpg"; //6
import zjHangNanLu from "./icon/zhenjidaolu/行南路.jpg"; //7
import zjHangTaiLu from "./icon/zhenjidaolu/行泰路.jpg"; //8
import zjHangXiLu from "./icon/zhenjidaolu/行西路.jpg"; //9
import zjHengAnLu from "./icon/zhenjidaolu/衡安路.jpg"; //10
import zjJiaNanLu from "./icon/zhenjidaolu/佳南路.jpg"; //11
import zjJingErLu from "./icon/zhenjidaolu/经二路.jpg"; //12
import zjJuJinLu from "./icon/zhenjidaolu/俱进路.jpg"; //13
import zjLaiYangLu from "./icon/zhenjidaolu/莱阳路.jpg"; //14
import zjNanXinLu from "./icon/zhenjidaolu/南新路.jpg"; //15
import zjNanZhangLu from "./icon/zhenjidaolu/南张路.jpg"; //16
import zjShuangQiaoLu from "./icon/zhenjidaolu/双桥路.jpg"; //17
import zjTingAnLu from "./icon/zhenjidaolu/庭安路.jpg"; //18
import zjWanAnJie from "./icon/zhenjidaolu/万安街.jpg"; //19
import zjXinHangLu from "./icon/zhenjidaolu/新行路.jpg"; //20
import zjYuanHuaLu from "./icon/zhenjidaolu/源华路.jpg"; //21
import zjDongJingLu from "./icon/zhenjidaolu/东靖路.jpg"; //22


const STATUS_NONE = 0;
const STATUS_DRAG_IMAGE = 1;

const convertRoadImage = (category, roadStr) => {
  if(category === "XiaChenDaoLu") {
    switch(roadStr) {
      case "庭安路":
      return xcTingAnLu;
      case "白萱路":
      return xcBaiXuanLu;
      case "秋岚路":
      return xcQiuLanLu;
      case "兰谷路":
      return xcLanGuLu;
      case "兰嵩路":
      return xcLanSongLu;
      case "莱阳路":
      return xcLaiYangLu;
      case "东煦路":
      return xcDongXuLu;
      case "繁锦路":
      return xcFanJinLu;
      case "蝶衣路":
      return xcDieYiLu;
      case "芳菲路":
      return xcFangFeiLu;
      case "紫衣路":
      return xcZiYiLu;
      case "启帆路":
      return xcQiFanLu;
      case "兰桥路":
      return xcLanQiaoLu;
      case "芳湄路":
      return xcFangMeiLu;
      case "津行路":
      return xcJinHangLu;
      case "巨峰路":
      return xcJuFengLu;
      case "东高路":
      return xcDongGaoLu;
      case "德爱路":
      return xcDeAiLu;
      case "谐安路":
      return xcXieAnLu;
      case "振庭路":
      return xcZhenTingLu;
      case "衡安路":
      return xcHengAnLu;
      case "金京路":
      return xcJinJingLu;

      default:
      return MapImage;
    }
  } else if(category === "ZhenJiDaoLu") {
    switch(roadStr) {
      case "东高路":
      return zjDongGaoLu;
      case "东沟路":
      return zjDongGouLu;
      case "高行街":
      return zjGaoHangJie;
      case "高西中心路":
      return zjGaoXiZhongXinLu;
      case "规划一路":
      return zjGuiHuaYiLu;
      case "行德路":
      return zjHangDeLu;
      case "行南路":
      return zjHangNanLu;
      case "行泰路":
      return zjHangTaiLu;
      case "行西路":
      return zjHangXiLu;
      case "衡安路":
      return zjHengAnLu;
      case "佳南路":
      return zjJiaNanLu;
      case "经二路":
      return zjJingErLu;
      case "俱进路":
      return zjJuJinLu;
      case "莱阳路":
      return zjLaiYangLu;
      case "南新路":
      return zjNanXinLu;
      case "南张路":
      return zjNanZhangLu;
      case "双桥路":
      return zjShuangQiaoLu;
      case "庭安路":
      return zjTingAnLu;
      case "万安街":
      return zjWanAnJie;
      case "新行路":
      return zjXinHangLu;
      case "源华路":
      return zjYuanHuaLu;
      case "东靖路":
      return zjDongJingLu;

      default:
      return MapImage;
    }
  } else {
    return MapImage;
  }
}


export default class MapLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false,
                    imgSrc: "" };
    this.imgInfo = {
      zoomRatio: 0.2,
      oriW: 0,
      oriH: 0,
    };

    this.status = {
      status: STATUS_NONE,
      startPoint: []
    };
  }
  
  componentWillReceiveProps = (newProps) => {
    if(newProps.roadName !== this.props.roadName) {
      let img = new Image();
      img.src = convertRoadImage(newProps.category, newProps.roadName);

      img.onload = () => {
        this.imgInfo.oriW = img.width;
        this.imgInfo.oriH = img.height;
        
        this.setState({
          imgSrc: img.src,
        });
        
        this.scaleImage();
      }
    }
  }

  componentDidMount = () => {
    let img = new Image();
    img.src = MapImage;
    
    img.onload = () => {
      this.imgInfo.oriW = img.width;
      this.imgInfo.oriH = img.height;
      
      this.setState({
        imgSrc: img.src,
      });
      
      this.scaleImage();
    }
  }
  
  /*
  scaleImage
  */
  scaleImage = () => {
    let ele = ReactDOM.findDOMNode(this.refs.imgElement);

    let w = this.imgInfo.oriW * this.imgInfo.zoomRatio;
    let h = this.imgInfo.oriH * this.imgInfo.zoomRatio;
    ele.width = w;
    ele.height = h;
  }
  
  /*
  change zoom ratio operation.
  */
  changeZoomRatio = (op) => {
    let ret = '';
    if (op === "+") {
      ret = 'zoomin';
      this.imgInfo.zoomRatio += 0.02;
      if (this.imgInfo.zoomRatio > 1.0) {
        this.imgInfo.zoomRatio = 1.0;
        ret = 'zoomin-end';
      }
    }
    else if (op === "-") {
      ret = 'zoomout';
      this.imgInfo.zoomRatio -= 0.02;
      if (this.imgInfo.zoomRatio < 0.1) {
        this.imgInfo.zoomRatio = 0.1;
        ret = 'zoomout-end';
      }
    }
    //console.log("zoom ratio: ", this.imgInfo.zoomRatio);
    return ret;
  }
  
  /*
  handleZoomin
  */
  handleZoomin = () => {
    this.changeZoomRatio("+");
    this.scaleImage();
  }
  
  /*
  handleZoomout
  */
  handleZoomout = () => {
    let zoom = this.changeZoomRatio("-");
    this.scaleImage();
    // only reset image's margin when zoomout.
    if (zoom === 'zoomout') {
      this.dragImage(100,100);
    } else if (zoom === 'zoomout-end') {
      let ele = ReactDOM.findDOMNode(this.refs.imgElement);
      ele.style.marginLeft = `0px`;
      ele.style.marginTop = `0px`;
    }
  }
  
  /*
  handleWheel
  */
  handleWheel= (e) => {
    let delta = e.deltaY;
    if(delta > 0) {
      this.handleZoomout();
    } else if(delta < 0) {
      this.handleZoomin();
    }
    // avoid main page scrolling.
    e.preventDefault();
  }
  
  handleKeyDown = (e) => {
    if ( e.which > 36 && e.which < 41 ) {    // arrow keys
      switch(e.which) {
        case 37: // left arrow
        this.dragImage(10, 0);
        break;
        case 39: // right arrow
        this.dragImage(-10, 0);
        break;
        case 38: // up arrow
        this.dragImage(0, 10);
        break;
        case 40: // down arrow
        this.dragImage(0, -10);
        break;

        default:
        break;
      }
      e.preventDefault();
      return;
    }
  }
  /**
   * dragImage
   */
  dragImage(moveX, moveY) {
    let ele = ReactDOM.findDOMNode(this.refs.imgElement);
    let deltaX = ele.width - window.innerWidth;
    let deltaY = ele.height - window.innerHeight;

    if (typeof(ele.style.marginLeft) === 'undefined' || ele.style.marginLeft === '') {
      ele.style.marginLeft = '0px';
    }
    if (typeof(ele.style.marginTop) === 'undefined' || ele.style.marginTop === '') {
      ele.style.marginTop = '0px';
    }
    let marginLeft = parseInt(ele.style.marginLeft, 10);
    let marginTop = parseInt(ele.style.marginTop, 10);

    if (deltaX > 0) {
      marginLeft += moveX;
      if (marginLeft > 0) {
        marginLeft = 0;
      }
      if (Math.abs(marginLeft) - deltaX > 0) {
        marginLeft = -deltaX;
      }
    }
    if (deltaY > 0) {
      marginTop += moveY;
      if (marginTop > 0) {
        marginTop = 0;
      }
      if (Math.abs(marginTop) - deltaY > 0) {
        marginTop = -deltaY;
      }
    }
    // remember reset marginLeft/marginTop when scale image.
    ele.style.marginLeft = `${marginLeft}px`;
    ele.style.marginTop = `${marginTop}px`;
  }

  /******************************
   *  MOUSE EVENTS 
   * ****************************/
  handleMouseDown = (e) => {
    // only accept mouse left key.
    if (e.button !== 0) {
      return;
    }
    this.status.startPoint = [e.clientX, e.clientY];
    this.status.status = STATUS_DRAG_IMAGE;
  }

  handleMouseMove = (e) => {
    if(this.status.status === STATUS_DRAG_IMAGE) {
      let p1 = this.status.startPoint;
      let p2 = [e.clientX, e.clientY];
      let moveX = (p2[0] - p1[0]);
      let moveY = (p2[1] - p1[1]);
      this.dragImage(moveX, moveY);
      this.status.startPoint = p2;
    }
    e.preventDefault();
  }

  handleMouseUp = (e) => {
    this.status.status = STATUS_NONE;
  }
  

  render = () => {
    return (
      <div tabIndex="0"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onWheel={this.handleWheel}
        onKeyDown={this.handleKeyDown}
      >
        <img ref="imgElement" src={this.state.imgSrc} alt=""/>
      </div>
    );
  }
}

