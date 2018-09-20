import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './AddCountry.css';
import { Col, Button, Container, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
      <Container className="mt-5">
        <h1>Add a new musician space</h1>
        <Form className="mt-5">
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                value={this.state.name}
                onChange={e => {
                  this.handleInputChange('name', e);
                }}
                placeholder="What's the name of the space?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="website" sm={2}>
              Website
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                value={this.state.website}
                id="website"
                onChange={e => {
                  this.handleInputChange('website', e);
                }}
                placeholder="Is there a website for the room?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="address" sm={2}>
              Address
            </Label>
            <Col sm={10}>
              <Input
                name="text"
                id="address"
                type="text"
                value={this.state.address}
                onChange={e => {
                  this.handleInputChange('address', e);
                }}
                placeholder="Where can we find the room?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={2}>
              Description
            </Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={this.state.description}
                cols="30"
                rows="10"
                onChange={e => {
                  this.handleInputChange('description', e);
                }}
                placeholder="What details would help people get access to the space?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="picture" sm={2}>
              Picture
            </Label>
            <Col sm={10}>
              <Input
                type="file"
                name="picture"
                id="picture"
                value={this.state.picture}
                onChange={e => {
                  this.handleInputChange('picture', e);
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="price" sm={2}>
              Price?
            </Label>
            <Col sm={10}>
              <Input
                type="number"
                name="number"
                id="price"
                value={this.state.price}
                onChange={e => {
                  this.handleInputChange('price', e);
                }}
                placeholder="Price in local currency?"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={{ size: 10 }}>
              <FormGroup check>
                <Container>
                  <Label check className="mr-4">
                    <Input type="checkbox" id="checkbox2" /> Piano?
                  </Label>
                  <Label check className="ml-4">
                    <Input type="checkbox" id="checkbox3" /> Drum Kit?
                  </Label>
                </Container>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={e => this.handleClick(e)}>Submit</Button>
            </Col>
          </FormGroup>
          <div
            style={{
              margin: 10,
              backgroundColor: 'red',
              display: this.state.message ? 'block' : 'none'
            }}
          >
            {this.state.message}
          </div>
        </Form>
      </Container>
    );
  }
}

export default AddSpace;
