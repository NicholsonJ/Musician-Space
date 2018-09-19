import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './AddCountry.css';

class AddSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      website: '',
      picture: '',
      price: '',
      description: '',
      message: null
    };
  }

  handleInputChange(stateFieldName, event) {
    let newState = {};
    newState[stateFieldName] = event.target.value;

    this.setState(newState);
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state.name, this.state.description);
    let data = {
      name: this.state.name,
      address: this.state.address,
      website: this.state.website,
      picture: this.state.picture,
      price: this.state.price,
      description: this.state.description
    };
    api
      .postSpaces(data)
      .then(result => {
        console.log('SUCCESS!');
        this.setState({
          name: '',
          address: '',
          website: '',
          picture: '',
          price: '',
          description: '',
          message: `Your space '${this.state.name}' has been created`
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => {
        console.log('ERROR');
      });
  }
  render() {
    return (
      <div className="AddSpace">
        <h2>Add Space</h2>
        <form>
          Name:{' '}
          <input
            type="text"
            value={this.state.name}
            onChange={e => {
              this.handleInputChange('name', e);
            }}
          />{' '}
          <br />
          Address:{' '}
          <input
            type="text"
            value={this.state.address}
            onChange={e => {
              this.handleInputChange('address', e);
            }}
          />{' '}
          <br />
          Website:{' '}
          <input
            type="text"
            value={this.state.website}
            onChange={e => {
              this.handleInputChange('website', e);
            }}
          />{' '}
          <br />
          Picture:{' '}
          <input
            type="number"
            value={this.state.picture}
            onChange={e => {
              this.handleInputChange('picture', e);
            }}
          />{' '}
          <br />
          Price:{' '}
          <input
            type="number"
            value={this.state.price}
            onChange={e => {
              this.handleInputChange('price', e);
            }}
          />{' '}
          <br />
          Description:{' '}
          <textarea
            value={this.state.description}
            cols="30"
            rows="10"
            onChange={e => {
              this.handleInputChange('description', e);
            }}
          />{' '}
          <br />
          <button onClick={e => this.handleClick(e)}>Create space</button>
        </form>
        <div
          style={{
            margin: 10,
            backgroundColor: 'red',
            display: this.state.message ? 'block' : 'none'
          }}
        >
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default AddSpace;
