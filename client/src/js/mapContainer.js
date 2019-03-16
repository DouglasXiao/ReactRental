import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geocoder: this.props.google.maps.Geocoder(),
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  fetchCurrentLocation(mapProps, map) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
    
          console.log('Your current position is:');
          console.log(`Latitude : ${position.coords.latitude}`);
          console.log(`Longitude: ${position.coords.longitude}`);
    
          map.setCenter(pos);
        }, function() { 
          this.handleLocationError(false, map.getCenter());
        });
    }
  }

  handleLocationError(browserHasGeolocation, pos) {
    // TODO
  }
  
  // decodeAndMarkAddress(address) {
  //   this.state.geocoder.geocode({'address': address}, function(results, status) {
  //     if (status == 'OK') {
  //       var locationURL = "";
  //       var thumbnailURL = "";
  //       var infoWindowHTML = "<div class='info-window'><div class='col1'><div class='title'>Beautiful SeaView House</div><br><div class='features'>" + address + "</div><br><a class='loc-detail' href='" + locationURL + "'>View place details</a></div><div class='col-2'>" + thumbnailURL + "</div></div>";
  //       this.createMarker(results[0].geometry.location, infoWindowHTML);
  //     } else {
  //       console.log('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  });

  render() {
    console.log("test map react here");
    return (
      <Map google={this.props.google} 
           zoom={14}
           onReady={this.fetchCurrentLocation} >
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'}
                position={{lat: 49.229307999999996, lng: -122.98573959999999}} />
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>

          <div class='info-window'>
            <div class='col1'>
              <div class='title'>Beautiful SeaView House</div><br/>
              <div class='features'>" + {this.state.selectedPlace.name} + "</div><br/>
                <a class='loc-detail' href='" + locationURL + "'>View place details</a>
              </div>
              <div class='col-2'>thumbnailURL</div>
            </div>

        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_1Rq6A6BV8gzzxRtd7rgpOpRkSw1i8yQ'
})(MapContainer)