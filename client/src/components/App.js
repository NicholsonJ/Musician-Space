import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spaces from './pages/Spaces';
import AddSpace from './pages/AddSpace';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import { Nav, NavItem, NavLink, Navbar, NavbarToggler, Collapse } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  handleLogoutClick(e) {
    api.logout();
  }

  handleSelect(latLng, address) {
    console.log(latLng, address);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar color="faded" light>
          <NavbarToggler onClick={this.toggle} className="mr-2 float-right ml-auto light" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Spaces</NavLink>
              </NavItem>
              {api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/add-space">Add Space</NavLink>{' '}
                </NavItem>
              )}
              {/* {api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/profile">Profile</NavLink>
                </NavItem>
              )} */}
              {!api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              )}
              {!api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
              )}
              {api.isLoggedIn() && (
                <NavItem>
                  <NavLink href="/Logout">Log Out</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
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
