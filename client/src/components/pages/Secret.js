import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './Secret.css';

class Secret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: null
    };
  }
  componentDidMount(props) {
    api.getSecret().then(data => {
      this.setState({
        secret: data.secret
      });
    });
  }
  render() {
    return (
      <div className="Secret">
        <h2>
          {}
          Profile
        </h2>
        {this.state.rooms}
      </div>
    );
  }
}

export default Secret;
