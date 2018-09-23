import React, { Component } from 'react';
import api from '../../api';
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

class SpaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: {}
    };
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    api
      .getDetail(this.props.match.params.id)
      .then(space => {
        let newSpace = space[0];
        this.setState({
          space: newSpace
        });
      })
      .catch(err => console.log(err));
  }

  handleBack() {
    this.props.history.goBack();
  }

  render() {
    console.log(this.state.space.name);
    console.log(BrowserRouter);
    return (
      <div className="spaceDetail">
        <h2>{this.state.space.name}</h2>
        <p>{this.state.space.description} </p>
        <Button onClick={this.handleBack}>Head Back</Button>
      </div>
    );
  }
}

export default SpaceDetail;
