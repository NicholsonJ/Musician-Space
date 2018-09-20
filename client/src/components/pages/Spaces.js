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
      spaces: []
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
        <Container style={{ display: 'flex' }}>
          <Col xs="6" sm="4">
            <h2>List of spaces</h2>
            {this.state.spaces.map((s, i) => (
              <Card inverse key={i}>
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
          </Col>
          <Col>
            <div style={{ width: '100%', height: 'calc(100vh - 40px)' }}>
              <GoogleMap margin={[10, 20, 30, 40]} center={{ lat: 45.75801, lng: 4.8000159 }} zoom={10}>
                {this.state.spaces.map(s => (
                  <PinInactive key={s.name} lat={s.loc.lat} lng={s.loc.lng} />
                ))}
              </GoogleMap>
            </div>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Spaces;
