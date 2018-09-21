import React, { Component } from 'react';
import api from '../../api';
import GoogleMap from 'google-map-react';
import {
  Form,
  FormGroup,
  Container,
  Row,
  Col,
  Label,
  Input,
  Card,
  CardTitle,
  CardText,
  CardImg,
  CardImgOverlay
} from 'reactstrap';
import PinInactive from '../markers/PinInactive';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      center: { lat: 52.506, lng: 13.37 },
      zoom: 2
    };
  }
  componentDidMount() {
    api
      .getSpaces()
      .then(spaces => {
        console.log(spaces);
        this.setState({
          spaces: spaces
        });
      })
      .catch(err => console.log(err));
  }

  handleClick(e, s) {
    this.setState({
      center: {
        lat: Number(s.loc.lat),
        lng: Number(s.loc.lng)
      }
    });
  }

  render() {
    return (
      <div className="Spaces">
        <Form>
          <FormGroup check inline>
            <Label check>
              <Input type="checkbox" /> Piano
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input type="checkbox" /> Drum Kit
            </Label>
          </FormGroup>
        </Form>
        <Container>
          <Row>
            <Col m="6" sm="4">
              <h2>List of spaces</h2>
              <Container className="pre-scrollable mt-3" style={{ maxHeight: '75vh' }}>
                {this.state.spaces.map((s, i) => (
                  <Card inverse key={i} onClick={e => this.handleClick(e, s)}>
                    <CardImg width="100%" src="/images/pianoDefault.jpg" alt="Card image cap" />
                    <CardImgOverlay>
                      <CardTitle>{s.name}</CardTitle>
                      <CardText>{s.description}</CardText>
                      <CardText>
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </CardText>
                    </CardImgOverlay>
                  </Card>
                ))}
              </Container>
            </Col>
            <Col m="auto">
              <div style={{ width: '100%', height: '80vh', border: '5px solid black' }}>
                <GoogleMap center={this.state.center} zoom={this.state.zoom}>
                  {this.state.spaces.map((s, i) => (
                    <PinInactive key={i} lat={s.loc.lat} lng={s.loc.lng} />
                  ))}
                </GoogleMap>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Spaces;
