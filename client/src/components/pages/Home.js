import React, { Component } from 'react';
import { Form, Button, InputGroup, InputGroupAddon, Row, Container, Input } from 'reactstrap';
import LocationSearchInput from './LocationSearch';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loc: {
        lat: '',
        lng: ''
      },
      address: ''
    };
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
    return (
      <Container className="">
        <h2>Home</h2>
        <Row className="justify-content-center align-items-center">
          <Form className="">
            <InputGroup className="form-group">
              <LocationSearchInput
                className="form-control justify-content-center align-items-center"
                onSelect={this.handleSelect}
                id="address"
                style={{ border: '1px solid black' }}
              />
            </InputGroup>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default Home;
