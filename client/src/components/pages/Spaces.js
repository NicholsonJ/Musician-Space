import React, { Component } from 'react';
import api from '../../api';
import GoogleMap from 'google-map-react';
import {
  Form,
  FormGroup,
  Container,
  Row,
  Col,
  CardText,
  Button,
  Label,
  Card,
  CardTitle,
  UncontrolledCarousel
} from 'reactstrap';
import Pin from '../markers/Pin';
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
      isHidden: true,
      card: '',
      hoverCard: '',
      piano: false,
      drum: false,
      activeIndex: -1
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

  detailsClick(e, s, i) {
    this.setState({
      isHidden: !this.state.isHidden,
      card: s,
      activeIndex: i
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

  getTextStyle(value) {
    if (value) {
      return {
        backgroundColor: '#5d6272',
        boxShadow: 'inset 0 0 0 1px #27496d,inset 0 5px 30px #193047'
      };
    } else {
      return {
        backgroundColor: '#a69888'
      };
    }
  }

  render() {
    if (this.state.center.lat === 0 && this.state.center.lng === 0) {
      return (
        <Container className="justify-content-center">
          <Col className="justify-content-center align-items-center vertical-center flex-column">
            <div>
              <img
                src="./images/MusicianSpaceLogo.png"
                alt="Musician Space Logo"
                style={{ width: '100%' }}
                className="openlogo"
              />
              <div className="input-animation">
                <LocationSearchInput
                  className="form-control input-lg d-flex justify-content-center align-items-center "
                  placeholder="Where would you like space?"
                  onSelect={this.handleSelect}
                  id="address"
                  style={{ textAlign: 'center', minWidth: '300px', maxWidth: '500px' }}
                />
              </div>
            </div>
          </Col>
        </Container>
      );
    }

    let spaces = this.state.spaces;
    console.log('spaces: ', spaces);
    if (this.state.piano) {
      spaces = this.state.spaces.filter(space => space.piano);
      console.log('revised spaces', spaces);
    }
    if (this.state.drum) {
      spaces = this.state.spaces.filter(space => space.drum);
      console.log('revised spaces', spaces);
    }
    if (this.state.drum && this.state.piano) {
      spaces = this.state.spaces.filter(space => space.drum && space.piano);
      console.log('revised spaces', spaces);
    }
    return (
      <div className="Spaces">
        <div className="navSearch">
          <Container>
            <Row>
              <LocationSearchInput
                className="form-control input-lg d-flex justify-content-center align-items-center"
                placeholder="Looking for somewhere else?"
                onSelect={this.handleSelect}
                id="address"
                style={{ border: '1px solid black', maxWidth: '300px' }}
              />
            </Row>
          </Container>
        </div>

        <Row>
          <Col xs="12" sm="5" md="3">
            <div>
              <h2>List of spaces</h2>
              <Form>
                <FormGroup check inline>
                  <Label check>
                    <Button
                      name="piano"
                      type="button"
                      style={this.getTextStyle(this.state.piano)}
                      onClick={e => this.checkbox(e)}
                    >
                      Piano
                    </Button>
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Button
                      name="drum"
                      type="button"
                      style={this.getTextStyle(this.state.drum)}
                      onClick={e => this.checkbox(e)}
                    >
                      Drum Kit
                    </Button>
                  </Label>
                </FormGroup>
              </Form>
              <div className="pre-scrollable mt-3" style={{ maxHeight: '75vh' }}>
                {spaces.map((s, i) => (
                  <Card
                    key={s._id}
                    onClick={e => this.handleClick(e, s)}
                    className="spaceCard"
                    onMouseOver={e => this.handleHover(e, s)}
                  >
                    <CardTitle>{s.name}</CardTitle>
                    <hr />
                    {s.type.map((s, i) => (
                      <CardText key={i} style={{ padding: '5px' }}>
                        {s}
                      </CardText>
                    ))}

                    <Label check>
                      <Button onClick={e => this.detailsClick(e, s, i)} outline>
                        More Details
                      </Button>
                    </Label>
                  </Card>
                ))}
              </div>
            </div>
          </Col>

          <Col xs="12" sm="7" md="9">
            <div className="googleMaps">
              {!this.state.isHidden && (
                <div sm="6" className="spaceDescription">
                  <Button
                    className="float-right"
                    onClick={e => this.detailsClick(e)}
                    style={{ zIndex: 20 }}
                    outline
                  >
                    &lt;
                  </Button>
                  <br />
                  <UncontrolledCarousel items={this.state.card.picture} />
                  <SpaceDetail space={this.state.card} />
                </div>
              )}
              <GoogleMap center={this.state.center} zoom={this.state.zoom}>
                {this.state.spaces.map((s, i) => (
                  <Pin
                    key={i}
                    lat={s.loc.coordinates[1]}
                    isActive={i === this.state.activeIndex}
                    lng={s.loc.coordinates[0]}
                  />
                ))}
              </GoogleMap>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Spaces;
