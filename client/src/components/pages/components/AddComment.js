import React, { Component } from 'react';
import api from '../../../api';
import { Col, Button, Container, Form, FormGroup, Input } from 'reactstrap';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  handleClick(e) {
    e.preventDefault();
    console.log(this.state);
    let comment = this.state.comment;
    let space = this.props.space;
    console.log(comment);

    api.addComment(comment, space).then(result => {
      console.log('SUCCESS!');
      this.props.clickConfirmed(e);
    });
  }
  handleChange(e) {
    this.setState({
      comment: e.target.value
    });
    console.log(this.state.comment);
  }
  render() {
    const isEnabled = this.state.comment !== '';

    return (
      <Container>
        <h1>Need to comment on the space?</h1>
        <Form className="mt-5" encType="multipart/form-data" onSubmit={e => this.handleClick(e)}>
          <FormGroup row>
            <h4>Add a Comment</h4>
            <br />
            <Col sm={10}>
              <Input
                type="textarea"
                name="comment"
                id="comment"
                value={this.state.comment}
                cols="30"
                rows="10"
                onChange={e => {
                  this.handleChange(e);
                }}
                placeholder="What details are missing?"
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

export default AddComment;
