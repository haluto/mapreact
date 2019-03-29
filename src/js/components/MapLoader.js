import React from 'react';
import ReactDOM from 'react-dom';

import MapImage from "./icon/map.jpg";
import TingAnLu from "./icon/庭安路.jpg";  //1
import BaiXuanLu from "./icon/白萱路.jpg"; //2
import QiuLanLu from "./icon/秋岚路.jpg";  //3
import LanGuLu from "./icon/兰谷路.jpg";  //4
import LanSongLu from "./icon/兰嵩路.jpg"; //5
import LaiYangLu from "./icon/莱阳路.jpg"; //6
import DongXuLu from "./icon/东煦路.jpg"; //7
import FanJinLu from "./icon/繁锦路.jpg"; //8
import DieYiLu from "./icon/蝶衣路.jpg"; //9
import FangFeiLu from "./icon/芳菲路.jpg"; //10
import ZiYiLu from "./icon/紫衣路.jpg"; //11
import QiFanLu from "./icon/启帆路.jpg"; //12
import LanQiaoLu from "./icon/兰桥路.jpg"; //13
import FangMeiLu from "./icon/芳湄路.jpg"; //14
import JinHangLu from "./icon/津行路.jpg"; //15
import JuFengLu from "./icon/巨峰路.jpg"; //16
import DongGaoLu from "./icon/东高路.jpg"; //17
import DeAiLu from "./icon/德爱路.jpg"; //18
import XieAnLu from "./icon/谐安路.jpg"; //19
import ZhenTingLu from "./icon/振庭路.jpg"; //20
import HengAnLu from "./icon/衡安路.jpg"; //21
import JinJingLu from "./icon/金京路.jpg"; //22


const STATUS_NONE = 0;
const STATUS_DRAG_IMAGE = 1;

const convertRoadImage = (roadStr) => {
  switch(roadStr) {
    case "庭安路":
    return TingAnLu;
    case "白萱路":
    return BaiXuanLu;
    case "秋岚路":
    return QiuLanLu;
    case "兰谷路":
    return LanGuLu;
    case "兰嵩路":
    return LanSongLu;
    case "莱阳路":
    return LaiYangLu;
    case "东煦路":
    return DongXuLu;
    case "繁锦路":
    return FanJinLu;
    case "蝶衣路":
    return DieYiLu;
    case "芳菲路":
    return FangFeiLu;
    case "紫衣路":
    return ZiYiLu;
    case "启帆路":
    return QiFanLu;
    case "兰桥路":
    return LanQiaoLu;
    case "芳湄路":
    return FangMeiLu;
    case "津行路":
    return JinHangLu;
    case "巨峰路":
    return JuFengLu;
    case "东高路":
    return DongGaoLu;
    case "德爱路":
    return DeAiLu;
    case "谐安路":
    return XieAnLu;
    case "振庭路":
    return ZhenTingLu;
    case "衡安路":
    return HengAnLu;
    case "金京路":
    return JinJingLu;

    default:
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
    if(newProps.roadName != this.props.roadName) {
      let img = new Image();
      img.src = convertRoadImage(newProps.roadName);

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

