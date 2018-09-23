import React, { Component } from 'react';
import api from '../../api';

class SpaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      space: {}
    };
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

  render() {
    console.log(this.state.space.name);
    return (
      <div className="spaceDetail">
        <h2>{this.state.space.name}</h2>
        <p>{this.state.space.description} </p>
      </div>
    );
  }
}

export default SpaceDetail;
