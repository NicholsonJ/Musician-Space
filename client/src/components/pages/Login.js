import React, { Component } from 'react';
import api from '../../api';
import { Alert } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
    };
  }

  handleInputChange(stateFieldName, event) {
    this.setState({
      [stateFieldName]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    api
      .login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!');
        this.props.history.push('/'); // Redirect to the home page
      })
      .catch(err => {
        console.log('ERROR');
        this.setState({
          error: !this.state.error
        });
      });
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <hr />
        <form>
          Username:{' '}
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.handleInputChange('username', e)}
          />{' '}
          <br />
          Password:{' '}
          <input
            type="password"
            value={this.state.password}
            onChange={e => this.handleInputChange('password', e)}
          />{' '}
          <br />
          {this.state.error && (
            <div className="d-flex justify-content-center">
              <br />
              <Alert color="danger">Incorrect credentials. Please try again or signup!</Alert>
            </div>
          )}
          <br />
          <button onClick={e => this.handleClick(e)}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
