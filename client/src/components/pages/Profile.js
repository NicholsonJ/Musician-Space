import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }
  componentDidMount(props) {
    api.getProfile().then(data => {
      this.setState({
        profile: data
      });
    });
  }
  render() {
    return (
      <div className="Profile">
        <h2>Profile</h2>
        {this.state.rooms}
      </div>
    );
  }
}

export default Profile;
