import React, { Component } from 'react';
import api from '../../api';
import { Col, Row, Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';
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
      type: '',
      piano: false,
      drum: false,
      price: '',
      description: '',
      message: null
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleInputChange(stateFieldName, event) {
    let newState = {};
    newState[stateFieldName] = event.target.value;
    if (stateFieldName === 'piano' || stateFieldName === 'drum') {
      this.setState({
        [stateFieldName]: !this.state[stateFieldName]
      });
    } else {
      this.setState(newState);
    }
    console.log(this.state);
  }

  handleFile(e) {
    console.log('handleChange');
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
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
          name: '',
          address: '',
          website: '',
          picture: '',
          loc: {
            lat: '',
            lng: ''
          },
          piano: false,
          drum: false,
          price: '',
          type: '',
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
  handleSelect(latLng, address) {
    console.log('address: ', address);
    console.log(latLng);

    this.setState({
      loc: {
        lat: latLng.lat,
        lng: latLng.lng
      },
      address
    });
  }
  render() {
    const isEnabled =
      this.state.name.length > 0 && this.state.loc.lat !== '' && this.state.loc.lng !== '';
    console.log(this.state.type);
    return (
      <Container className="mt-5" style={{ maxWidth: '50vw' }}>
        <h1>Add a new musician space</h1>
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
                <LocationSearchInput onSelect={this.handleSelect} id="address" />
                {this.state.address && <span>Your address: {this.state.address}</span>}
              </Row>
            </Col>
          </FormGroup>
          <FormGroup tag="fieldset" row>
            <Label for="type" sm={2}>
              Type of Space
            </Label>
            <Col sm={10} id="type">
              <Container>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio2"
                      value="practice"
                      onChange={e => {
                        this.handleInputChange('type', e);
                      }}
                    />{' '}
                    Practice Room
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio2"
                      value="rehearsal"
                      onChange={e => {
                        this.handleInputChange('type', e);
                      }}
                    />{' '}
                    Rehearsal Space
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio2"
                      value="hall"
                      onChange={e => {
                        this.handleInputChange('type', e);
                      }}
                    />{' '}
                    Recording Hall
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="radio"
                      name="radio2"
                      value="studio"
                      onChange={e => {
                        this.handleInputChange('type', e);
                      }}
                    />{' '}
                    Studio Space
                  </Label>
                </FormGroup>
              </Container>
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
                accept="image/*"
                onChange={e => {
                  this.handleFile(e);
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
                    <Input
                      type="checkbox"
                      id="checkbox2"
                      value="true"
                      onChange={e => {
                        this.handleInputChange('piano', e);
                      }}
                    />{' '}
                    Piano?
                  </Label>
                  <Label check className="ml-4">
                    <Input
                      type="checkbox"
                      id="checkbox3"
                      value="true"
                      onChange={e => {
                        this.handleInputChange('drum', e);
                      }}
                    />{' '}
                    Drum Kit?
                  </Label>
                </Container>
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button type="submit" disabled={!isEnabled}>
                Submit
              </Button>
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
