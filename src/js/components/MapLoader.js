import React from 'react';
import ReactDOM from 'react-dom';

import MapImage from "./icon/map.png";

export default class MapLoader extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { liked: false,
                    imgSrc: "" };
    this.imgInfo = {
      zoomRatio: 1.0,
      oriW: 0,
      oriH: 0,
    };
  }
  
  componentDidMount = () => {
    console.log("componentDidMount");
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
    if (op === "+") {
      this.imgInfo.zoomRatio += 0.2;
      if (this.imgInfo.zoomRatio > 4.0) {
        this.imgInfo.zoomRatio = 4.0;
      }
    }
    else if (op === "-") {
      this.imgInfo.zoomRatio -= 0.2;
      if (this.imgInfo.zoomRatio < 0.4) {
        this.imgInfo.zoomRatio = 0.4;
      }
    }
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
    this.changeZoomRatio("-");
    this.scaleImage();
  }
  
  /*
  handleWheel
  */
  handleWheel= (e) => {
    let delta = e.deltaY;
    if(delta > 0) {
      this.handleZoomout();
      console.log("zoom out");
    } else if(delta < 0) {
      this.handleZoomin();
      console.log("zoom in");
    }

    // avoid main page scrolling.
    e.preventDefault();
  }
  
  handleMouseDown = (e) => {
    console.log(e.button);
  }
  

  render = () => {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <div 
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onWheel={this.handleWheel}
        onKeyPress={this.handleKeyPress}
      >
        <img ref="imgElement" src={this.state.imgSrc}/>
      </div>
    );
  }
}

