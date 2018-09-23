import React, { Component } from 'react';
import api from '../../api';
import GoogleMap from 'google-map-react';
import { Link } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Container,
  Row,
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

class Spaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spaces: [],
      center: { lat: '', lng: '' },
      zoom: 10,
      address: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
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

  render() {
    if (this.state.center.lat === '') {
      return (
        <Container className="">
          <Row className="justify-content-center align-items-center">
            <Form className="vertical-center">
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
                  <Card key={i} onClick={e => this.handleClick(e, s)} style={{ minHeight: '140px' }}>
                    <CardTitle>{s.name}</CardTitle>
                    <CardText>
                      <small className="text-muted">{s.description}</small>
                    </CardText>

                    <Link to={'/details/' + s._id}>More Details</Link>
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
