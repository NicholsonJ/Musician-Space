import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container className="">
        <h2>Home</h2>
        Welcome to Musician Space
        <button>
          <Link to="/spaces">Head in</Link>
        </button>
      </Container>
    );
  }
}

export default Home;
