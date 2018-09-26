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
        {this.props.space.price && <div>There is a charge for this space</div>}
        <p>{this.props.space.website}</p>
        <br />
        <a href="/addpic">NON FUNCTIONAL</a>
        <hr />
        <Button onClick={e => this.props.onClick(e)}>Head Back</Button>
      </div>
    );
  }
}

export default SpaceDetail;
