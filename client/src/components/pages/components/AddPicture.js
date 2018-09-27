import React, { Component, Redirect } from 'react';
import api from '../../../api';
import { Col, Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

class AddPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      message: '',
      on: false,
      redirect: false
    };
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state);
    let picture = this.state.picture;
    let space = this.props.space;
    console.log(picture);

    api.addPic(picture, space).then(result => {
      console.log('SUCCESS!');
    });
  }
  handleFile(e) {
    this.setState({
      picture: e.target.files[0]
    });
  }
  render() {
    const isEnabled = this.state.picture !== '';
    console.log(this.props.space);

    return (
      <Container>
        <h1>Add a new picture!</h1>
        <Form className="mt-5" encType="multipart/form-data" onSubmit={e => this.handleClick(e)}>
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
          <FormGroup check row tag="fieldset">
            <Col>
              <Button type="submit" disabled={!isEnabled} style={{ margin: '20px' }}>
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default AddPicture;
