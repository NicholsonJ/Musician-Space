import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Spaces from './pages/Spaces';
import AddSpace from './pages/AddSpace';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import { Nav, NavItem, NavLink, Row } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      isOpen: false
    };
    // this.toggle = this.toggle.bind(this);
  }

  handleLogoutClick(e) {
    api.logout();
  }

  handleSelect(latLng, address) {
    console.log(latLng, address);
  }

  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }

  render() {
    return (
      <div className="App">
        <header className="" style={{ zIndex: '20' }}>
          <Nav className="float-right ml-auto" navbar>
            <Row>
              <NavItem style={{ margin: '5px' }}>
                <NavLink href="/">Spaces</NavLink>
              </NavItem>
              {api.isLoggedIn() && (
                <NavItem style={{ margin: '5px' }}>
                  <NavLink href="/add-space">Add Space</NavLink>{' '}
                </NavItem>
              )}
              {api.isLoggedIn() && (
                <NavItem style={{ margin: '5px' }}>
                  <NavLink href="/profile">Profile</NavLink>
                </NavItem>
              )}
              {!api.isLoggedIn() && (
                <NavItem style={{ margin: '5px' }}>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              )}
              {!api.isLoggedIn() && (
                <NavItem style={{ margin: '5px' }}>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
              )}
              {api.isLoggedIn() && (
                <NavItem style={{ margin: '5px' }}>
                  <NavLink href="/Logout">Log Out</NavLink>
                </NavItem>
              )}
            </Row>
          </Nav>
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
