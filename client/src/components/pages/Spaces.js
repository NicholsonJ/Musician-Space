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
  Input,
  InputGroup,
  Card,
  CardTitle,
  CardText
} from 'reactstrap';
import PinInactive from '../markers/PinInactive';
import LocationSearchInput from './LocationSearch';
import SpaceDetail from './SpaceDetail';

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      center: { lat: 0, lng: 0 },
      zoom: 10,
      address: '',
      isHidden: 'true',
      card: ''
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

  render() {
    if (this.state.center.lat === 0 && this.state.center.lng === 0) {
      return (
        <Container className="">
          <Row className="justify-content-center align-items-center">
            <Form className="vertical-center">
              <InputGroup className="form-group ">
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
              {!this.state.isHidden && (
                <SpaceDetail
                  style={{ zIndex: 5 }}
                  space={this.state.card}
                  onClick={e => this.detailsClick(e)}
                />
              )}
              {this.state.isHidden && (
                <div>
                  <h2>List of spaces</h2>
                  <Container className="pre-scrollable mt-3" style={{ maxHeight: '75vh' }}>
                    {this.state.spaces.map((s, i) => (
                      <Card key={i} onClick={e => this.handleClick(e, s)} style={{ minHeight: '140px' }}>
                        <CardTitle>{s.name}</CardTitle>
                        <CardText>
                          <small className="text-muted">{s.description}</small>
                        </CardText>
                        <Button onClick={e => this.detailsClick(e, s)}>More Details</Button>
                      </Card>
                    ))}
                  </Container>
                </div>
              )}
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
