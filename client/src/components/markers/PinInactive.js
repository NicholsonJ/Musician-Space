import React, { Component } from 'react';

const K_WIDTH = 50;
const K_HEIGHT = 50;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT,

  backgroundImage: 'url(/images/inactivePin.png)',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
};

class PinInactive extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClick(e) {
    console.log(e.target);
  }
  render() {
    return (
      <div style={greatPlaceStyle} onClick={e => this.onClick(e)} onMouseLeave={this.props.onMouseLeave}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default PinInactive;
