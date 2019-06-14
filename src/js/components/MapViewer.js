import React from 'react';
import ReactDOM from 'react-dom';

import ImgMain from "./icon/globalview/道路总图.jpg";
import ImgBuilding from "./icon/globalview/建筑设施.png";
import ImgQuGuan from "./icon/globalview/区管道路.png";
import ImgWeiYiJiao from "./icon/globalview/未移交在建道路.png";
import ImgXiaChen from "./icon/globalview/下沉道路.png";
import ImgZhenJi from "./icon/globalview/镇级道路.png";

const STATUS_NONE = 0;
const STATUS_DRAG_IMAGE = 1;

const IDX_Main = 0;
const IDX_QuGuan = 1;
const IDX_XiaChen = 2;
const IDX_ZhenJi = 3;
const IDX_WeiYiJiao = 4;
const IDX_Building = 5;
const IDX_Total = 6;

export default class MapViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showZhenJi: false,
      showQuGuan: false,
      showXiaChen: false,
      showWeiYiJiao: false,
      showBuilding: false
    };

    this.imgInfo = {
      zoomRatio: 0.26,
      oriW: 0,
      oriH: 0,
    };

    this.status = {
      status: STATUS_NONE,
      startPoint: []
    };
  }
  
  checkWhetherShowMask = (checkedRoads) => {
  let bQuGuan = false, bZhenJi = false, bXiaChen = false, bWeiYiJiao = false, bBuilding = false;
    if (checkedRoads.indexOf("vCheckZhenJi") >= 0) {
      bZhenJi = true;
    }
    if (checkedRoads.indexOf("vCheckXiaChen") >= 0) {
      bXiaChen = true;
    }
    if (checkedRoads.indexOf("vCheckQuGuan") >= 0) {
      bQuGuan = true;
    }
    if (checkedRoads.indexOf("vCheckWeiYiJiao") >= 0) {
      bWeiYiJiao = true;
    }
    if (checkedRoads.indexOf("vCheckBuilding") >= 0) {
      bBuilding = true;
    }
    console.log("mapviewer get infomation: ", checkedRoads);
    this.setState({showZhenJi: bZhenJi,
                    showQuGuan: bQuGuan,
                    showXiaChen: bXiaChen,
                    showBuilding: bBuilding,
                    showWeiYiJiao: bWeiYiJiao
    });
  }

  componentWillReceiveProps = (newProps) => {
    if(newProps.checkedRoads !== this.props.checkedRoads) {
      this.checkWhetherShowMask(newProps.checkedRoads);
    }
  }


  componentDidMount = () => {
    let img = new Image();
    img.src = ImgMain;
    
    img.onload = () => {
      this.imgInfo.oriW = img.width;
      this.imgInfo.oriH = img.height;
      
      this.scaleImage();

      this.checkWhetherShowMask(this.props.checkedRoads);
    }
  }
  
  /**
   * 
   */
  getRefByIndex = (i) => {
    let ref;
    switch(i) {
      case IDX_Main:
        ref = this.refs.refImgMain;
        break;
      case IDX_QuGuan:
        ref = this.refs.refImgQuGuan;
        break;
      case IDX_XiaChen:
        ref = this.refs.refImgXiaChen;
        break;
      case IDX_ZhenJi:
        ref = this.refs.refImgZhenJi;
        break;
      case IDX_WeiYiJiao:
        ref = this.refs.refImgWeiYiJiao;
        break;
      case IDX_Building:
        ref = this.refs.refImgBuilding;
        break;
      default:
        console.error("Error when get global viewer image ref, index: " + i);
        break;
    }

    return ref;
  }

  /**
   * scaleImage
   */
  scaleImage = () => {
    for(let i=0;i<IDX_Total;i++) {
      let ref = this.getRefByIndex(i);
      
      // LOGIC START.
      let ele = ReactDOM.findDOMNode(ref);
      if (ele === null) {
        break;
      }
      let w = this.imgInfo.oriW * this.imgInfo.zoomRatio;
      let h = this.imgInfo.oriH * this.imgInfo.zoomRatio;
      ele.width = w;
      ele.height = h;
      // LOGIC END.
    }
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
      for(let i=0;i<IDX_Total;i++) {
        let ref = this.getRefByIndex(i);
        
        // LOGIC START.
        let ele = ReactDOM.findDOMNode(ref);
        if (ele === null) {
          break;
        }

        ele.style.marginLeft = `0px`;
        ele.style.marginTop = `0px`;
        // LOGIC END.
      }
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
    for(let i=0;i<IDX_Total;i++) {
      let ref = this.getRefByIndex(i);
      
      // LOGIC START.
      let ele = ReactDOM.findDOMNode(ref);
      if(ele === null) {
        break;
      }

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
      // LOGIC END.
    }
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
      <div tabIndex="0" className="global-view-container"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onWheel={this.handleWheel}
        onKeyDown={this.handleKeyDown}
      >
        <img ref="refImgMain" src={ImgMain} alt="" className="global-view-img-main"/>

        <img hidden={!this.state.showBuilding} ref="refImgBuilding" src={ImgBuilding} alt="" className="global-view-img-mask"/>
        <img hidden={!this.state.showQuGuan} ref="refImgQuGuan" src={ImgQuGuan} alt="" className="global-view-img-mask"/>
        <img hidden={!this.state.showZhenJi} ref="refImgZhenJi" src={ImgZhenJi} alt="" className="global-view-img-mask"/>
        <img hidden={!this.state.showXiaChen} ref="refImgXiaChen" src={ImgXiaChen} alt="" className="global-view-img-mask"/>
        <img hidden={!this.state.showWeiYiJiao} ref="refImgWeiYiJiao" src={ImgWeiYiJiao} alt="" className="global-view-img-mask"/>
        
      </div>
    );
  }
}

