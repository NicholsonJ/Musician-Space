import React, { Component } from 'react';
import api from '../../api';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: []
    };
  }
  componentDidMount() {
    api
      .getSpaces()
      .then(spaces => {
        console.log(spaces);
        this.setState({
          spaces: spaces
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="Spaces">
        <h2>List of spaces</h2>
        {this.state.spaces.map((s, i) => (
          <li key={i}>{s.name}</li>
        ))}
      </div>
    );
  }
}

export default Spaces;
