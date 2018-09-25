import React, { Component } from 'react';
import { Button } from 'reactstrap';

class SpaceDetail extends Component {
  handleClick(e) {}
  render() {
    console.log(this.props.space.name);
    return (
      <div className="spaceDetail">
        <h2>{this.props.space.name}</h2>
        <p>{this.props.space.description} </p>
        <Button onClick={e => this.props.onClick(e)}>Head Back</Button>
      </div>
    );
  }
}

export default SpaceDetail;
