import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
// import Home from './pages/Home';
import Spaces from './pages/Spaces';
import AddSpace from './pages/AddSpace';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import './App.css';
// import SpaceDetail from './pages/components/SpaceDetail';
// import LocationSearchInput from './pages/LocationSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: []
    };
    // this.handleSelect = this.handleSelect.bind(this);
  }

  handleLogoutClick(e) {
    api.logout();
  }

  handleSelect(latLng, address) {
    console.log(latLng, address);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <Link to="/">Home</Link> */}
          <Link to="/">Spaces</Link>
          {api.isLoggedIn() && <Link to="/add-space">Add Space</Link>}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
          <Link to="/profile">Profile</Link>
        </header>
        <Switch>
          <Route path="/" exact component={Spaces} />
          {/* <Route path="/spaces" component={Spaces} /> */}
          {/* <Route path="/details/:id" component={SpaceDetail} /> */}
          <Route path="/add-space" component={AddSpace} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
