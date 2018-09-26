import React, { Component } from 'react';
import api from '../../api';
import { Col, Row, Button, Container, Form, FormGroup, Label, Alert, Input } from 'reactstrap';
import LocationSearchInput from './components/LocationSearch';

class AddSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      website: '',
      loc: {
        lat: '',
        lng: ''
      },
      picture: '',
      type: {
        practice: false,
        rehearsal: false,
        studio: false,
        hall: false
      },
      piano: false,
      drum: false,
      price: false,
      description: '',
      on: false,
      message: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleInputChange(stateFieldName, event) {
    let newState = {};
    newState[stateFieldName] = event.target.value;
    this.setState(newState);
  }

  handleFile(e) {
    this.setState({
      picture: e.target.files[0]
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state);
    let data = {
      name: this.state.name,
      website: this.state.website,
      lat: this.state.loc.lat,
      lng: this.state.loc.lng,
      picture: this.state.picture,
      type: this.state.type,
      price: this.state.price,
      piano: this.state.piano,
      drum: this.state.drum,
      description: this.state.description
    };
    console.log(data);
    api
      .postSpaces(data)
      .then(result => {
        console.log('SUCCESS!');
        this.setState({
          on: true,
          message: `Your space '${this.state.name}' has been created`
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
          this.props.history.push('/');
        }, 2000);
      })
      .catch(err => {
        console.log('ERROR');
      });
  }
  handleSelect(latLng, address) {
    this.setState({
      loc: {
        lat: latLng.lat,
        lng: latLng.lng
      },
      address
    });
  }
  handleTypeClick(e) {
    this.setState({
      type: { ...this.state.type, [e.target.value]: !this.state.type[e.target.value] }
    });
  }
  handleButtonClick(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }
  getTextStyle(value) {
    if (value) {
      return {
        backgroundColor: 'blue'
      };
    } else {
      return {
        backgroundColor: 'green'
      };
    }
  }
  render() {
    const isEnabled =
      this.state.name.length > 0 && this.state.loc.lat !== '' && this.state.loc.lng !== '';
    return (
      <Container className="mt-5" style={{ maxWidth: '1000px' }}>
        <h1>Add a new musician space</h1>
        <Alert color="success" isOpen={this.state.on}>
          {this.state.message}
        </Alert>
        <Form className="mt-5" encType="multipart/form-data" onSubmit={e => this.handleClick(e)}>
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
              <Row>
                <LocationSearchInput
                  onSelect={this.handleSelect}
                  id="address"
                  address={this.state.address}
                />
              </Row>

              {this.state.address && <Alert color="danger">Your address: {this.state.address}</Alert>}
            </Col>
          </FormGroup>
          <FormGroup tag="fieldset" row>
            <span className="btn-group " role="group">
              <Col className="d-flex justify-content-center">
                <Button
                  type="button"
                  style={this.getTextStyle(this.state.type.practice)}
                  value="practice"
                  onClick={e => {
                    this.handleTypeClick(e);
                  }}
                >
                  Practice Room
                </Button>
                <Button
                  type="button"
                  style={this.getTextStyle(this.state.type.rehearsal)}
                  value="rehearsal"
                  onClick={e => {
                    this.handleTypeClick(e);
                  }}
                >
                  Rehearsal Space
                </Button>

                <Button
                  type="button"
                  style={this.getTextStyle(this.state.type.hall)}
                  value="hall"
                  onClick={e => {
                    this.handleTypeClick(e);
                  }}
                >
                  Recording Hall
                </Button>

                <Button
                  type="button"
                  style={this.getTextStyle(this.state.type.studio)}
                  value="studio"
                  onClick={e => {
                    this.handleTypeClick(e);
                  }}
                >
                  Studio Space
                </Button>
              </Col>
            </span>
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
                accept="image/*"
                onChange={e => {
                  this.handleFile(e);
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col>
              <FormGroup check className="justify-content-center">
                <Container>
                  <Label check className="">
                    <Button
                      type="button"
                      name="piano"
                      style={this.getTextStyle(this.state.piano)}
                      value="true"
                      onClick={e => {
                        this.handleButtonClick(e);
                      }}
                    >
                      Piano?
                    </Button>
                  </Label>
                  <Label check className="">
                    <Button
                      type="button"
                      name="drum"
                      style={this.getTextStyle(this.state.drum)}
                      value="true"
                      onClick={e => {
                        this.handleButtonClick(e);
                      }}
                    >
                      {' '}
                      Drum Kit?
                    </Button>
                  </Label>
                  <br />

                  <Label check className="mt-3">
                    <Button
                      type="button"
                      style={this.getTextStyle(this.state.price)}
                      name="price"
                      value="true"
                      onClick={e => {
                        this.handleButtonClick(e);
                      }}
                    >
                      Is there a charge for the space?
                    </Button>
                  </Label>
                  {this.state.price && (
                    <Alert color="warning">
                      Please add information about the rates in the description
                    </Alert>
                  )}
                </Container>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col>
              <Button type="submit" disabled={!isEnabled}>
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default AddSpace;
