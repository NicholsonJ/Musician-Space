import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';
import { Col, Input } from 'reactstrap';

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({
      address: address
    });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.onSelect(latLng, address))
      .catch(error => console.error('Error', error));
  };
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Col style={{ zIndex: '20' }}>
            <Input
              className="mw-100"
              {...getInputProps({
                style: this.props.style,
                placeholder: this.props.placeholder,
                type: 'text'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#a69888', cursor: 'pointer', color: '#ffffff' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer', color: '#7c8a9c' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </Col>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
