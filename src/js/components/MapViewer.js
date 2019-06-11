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

export default class MapViewer extends React.Component {
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
  
  /*
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
*/

  componentDidMount = () => {
    let img = new Image();
    img.src = ImgMain;
    
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

