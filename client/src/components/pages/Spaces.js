import React, { Component } from 'react';
import api from '../../api';
import GoogleMap from 'google-map-react';
import {
  Form,
  FormGroup,
  Container,
  Row,
  Button,
  Col,
  Label,
  Card,
  CardTitle,
  UncontrolledCarousel
} from 'reactstrap';
import PinInactive from '../markers/PinInactive';
import LocationSearchInput from './components/LocationSearch';
import SpaceDetail from './components/SpaceDetail';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      center: { lat: 0, lng: 0 },
      zoom: 10,
      address: '',
      isHidden: 'true',
      card: '',
      hoverCard: '',
      piano: false,
      drum: false
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    api
      .getSpaces(this.state.center.lat, this.state.center.lng)
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
        lat: s.loc.coordinates[1],
        lng: s.loc.coordinates[0]
      }
    });
  }

  handleSelect(latLng, address) {
    console.log('address: ', address);
    console.log(latLng);

    this.setState({
      center: {
        lat: latLng.lat,
        lng: latLng.lng
      },
      address
    });
  }

  detailsClick(e, s) {
    console.log('here');
    this.setState({
      isHidden: !this.state.isHidden,
      card: s
    });
  }

  handleHover(e, i) {
    console.log('i am hovering');
  }

  checkbox(e) {
    console.log(this.state[e.target.name]);
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  render() {
    if (this.state.center.lat === 0 && this.state.center.lng === 0) {
      return (
        <Container style={{ padding: '10px 20vw' }}>
          <Row className="justify-content-center align-items-center vertical-center">
            <LocationSearchInput
              className="form-control input-lg d-flex justify-content-center align-items-center"
              onSelect={this.handleSelect}
              id="address"
              style={{ border: '1px solid black' }}
            />
          </Row>
        </Container>
      );
    }
    console.log(this.state.card);
    return (
      <div className="Spaces">
        <div style={{ padding: '10px 20vw', backgroundColor: 'black' }}>
          <Container>
            <Row>
              <LocationSearchInput
                className="form-control input-lg d-flex justify-content-center align-items-center"
                onSelect={this.handleSelect}
                id="address"
                style={{ border: '1px solid black', maxWidth: '300px' }}
              />
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <Col m="6" sm="4">
              <div>
                <h2>List of spaces</h2>
                <Form>
                  <FormGroup check inline>
                    <Label check>
                      <Button name="piano" type="button" value="true" onClick={e => this.checkbox(e)}>
                        Piano
                      </Button>
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Button name="drum" type="button" value="true" onClick={e => this.checkbox(e)}>
                        Drum Kit
                      </Button>
                    </Label>
                  </FormGroup>
                </Form>
                <Container className="pre-scrollable mt-3" style={{ maxHeight: '75vh' }}>
                  {this.state.spaces.map((s, i) => (
                    <Card
                      key={i}
                      onClick={e => this.handleClick(e, s)}
                      style={{ minHeight: '200px' }}
                      onMouseOver={e => this.handleHover(e, i)}
                    >
                      <CardTitle>{s.name}</CardTitle>
                      <Button onClick={e => this.detailsClick(e, s)}>More Details</Button>
                    </Card>
                  ))}
                </Container>
              </div>
            </Col>
            {!this.state.isHidden && (
              <Col>
                <UncontrolledCarousel items={this.state.card.picture} style={{ height: '50px' }} />
                <SpaceDetail space={this.state.card} onClick={e => this.detailsClick(e)} />
              </Col>
            )}
            <Col m="auto">
              <div style={{ height: '80vh', border: '5px solid black' }}>
                <GoogleMap center={this.state.center} zoom={this.state.zoom}>
                  {this.state.spaces.map((s, i) => (
                    <PinInactive key={i} lat={s.loc.coordinates[1]} lng={s.loc.coordinates[0]} />
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
