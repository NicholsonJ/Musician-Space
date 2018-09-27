import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AddPicture from './AddPicture';

class SpaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addpic: false
    };
  }

  handleClick(e, s) {
    console.log('handleclick: ', this.state.addpic);
    this.setState({
      addpic: true
    });
  }

  changeState(e) {
    console.log('addpic:', this.state.addpic);
    this.setState({
      addpic: false
    });
  }

  render() {
    console.log(this.props.space.name);
    console.log(this.state.addpic);
    if (this.state.addpic) {
      return <AddPicture space={this.props.space} newstate={e => this.changeState(e)} />;
    }

    return (
      <div className="spaceDetail">
        <h2>{this.props.space.name}</h2>
        <p>{this.props.space.description} </p>
        {this.props.space.price && <div>There is a charge for this space</div>}
        <p>{this.props.space.website}</p>
        <br />
        <Button
          space={this.props.space}
          onClick={e => {
            this.handleClick(e);
          }}
        >
          Add More Photos
        </Button>

        <hr />
        <Button onClick={e => this.props.onClick(e)}>Head Back</Button>
      </div>
    );
  }
}

export default SpaceDetail;
