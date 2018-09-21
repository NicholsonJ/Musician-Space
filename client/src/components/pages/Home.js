import React, { Component } from 'react';
import { Form, Button, InputGroup, InputGroupAddon, Container, Input } from 'reactstrap';

class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <Container className="Home h-100">
        <h2>Home</h2>
        <Form className="row h-100 justify-content-center align-items-center">
          <InputGroup className="form-group">
            <Input placeholder="Where do you need a space?" className="form-control" />
            <InputGroupAddon addonType="append">
              <Button color="success">Let's go!</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Container>
    );
  }
}

export default Home;
