import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Spaces from './pages/Spaces';
import AddSpace from './pages/AddSpace';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import '../styles/style.css';
import {
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

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
        <header>
          <Navbar dark expand="lg">
            <NavbarToggler onClick={this.toggle} />

            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret color="danger">
                  <img className="App-logo" src="./images/Note.png" alt="this" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to="/">Spaces</Link>
                  </DropdownItem>
                  <DropdownItem>
                    {api.isLoggedIn() && <Link to="/add-space">Add Space</Link>}
                  </DropdownItem>
                  <DropdownItem>{api.isLoggedIn() && <Link to="/profile">Profile</Link>}</DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem>{!api.isLoggedIn() && <Link to="/login">Login</Link>}</DropdownItem>
                  <DropdownItem>
                    {api.isLoggedIn() && (
                      <Link to="/" onClick={e => this.handleLogoutClick(e)}>
                        Logout
                      </Link>
                    )}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Navbar>
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
