import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      profile: {}
    };
  }
  componentDidMount(props) {
    api.getProfile().then(data => {
      console.log('user: ', data);
      this.setState({
        profile: data
      });
    });
  }
  render() {
    console.log('profile:', this.state.profile);
    return (
      <div className="Profile">
        <h2>Profile</h2>
        {this.state.profile.likes}
      </div>
    );
  }
}

export default Profile;
