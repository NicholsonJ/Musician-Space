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
  Card,
  CardTitle,
  CardText,
  UncontrolledCarousel
} from 'reactstrap';
import PinInactive from '../markers/PinInactive';
import LocationSearchInput from './components/LocationSearch';
import SpaceDetail from './components/SpaceDetail';

const items = [
  {
    src:
      'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 1',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src:
      'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header'
  },
  {
    src:
      'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header'
  }
];

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
    console.log(e.target.name);
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  }

  render() {
    if (this.state.center.lat === 0 && this.state.center.lng === 0) {
      return (
        <Container style={{ padding: '10px 300px' }}>
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
        <div style={{ padding: '10px 300px', backgroundColor: 'black' }}>
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
                      <Input name="piano" type="checkbox" value="true" onClick={e => this.checkbox(e)} />{' '}
                      Piano
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Label check>
                      <Input name="drum" type="checkbox" value="true" onClick={e => this.checkbox(e)} />{' '}
                      Drum Kit
                    </Label>
                  </FormGroup>
                </Form>
                <Container className="pre-scrollable mt-3" style={{ maxHeight: '75vh' }}>
                  {this.state.spaces.map((s, i) => (
                    <Card
                      key={i}
                      onClick={e => this.handleClick(e, s)}
                      style={{ minHeight: '140px' }}
                      onMouseOver={e => this.handleHover(e, i)}
                    >
                      <CardTitle>{s.name}</CardTitle>
                      <CardText>
                        <small className="text-muted">{s.description}</small>
                      </CardText>
                      <Button onClick={e => this.detailsClick(e, s)}>More Details</Button>
                    </Card>
                  ))}
                </Container>
              </div>
            </Col>
            {!this.state.isHidden && (
              <Col>
                <UncontrolledCarousel items={this.state.card.picture} />
                <SpaceDetail space={this.state.card} onClick={e => this.detailsClick(e)} />
              </Col>
            )}
            <Col m="auto">
              <div style={{ width: '100%', height: '80vh', border: '5px solid black' }}>
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
