import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.fetchCurrentLocation = this.fetchCurrentLocation.bind(this);

    this.state = {
        // To initialize some variables
    };
  }

  fetchCurrentLocation(mapProps, map) {
    const {google} = mapProps;
    var geocoder = new google.maps.Geocoder();
    var infoWindow = new google.maps.InfoWindow();

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
          this.handleLocationError(true, infoWindow, map);
        });
    }

    var rentalList = [];
    rentalList.push('6058 selma ave, burnaby, bc, canada');
    rentalList.push('6033 selma ave, burnaby, bc, canada');
    rentalList.push('5175 Kingsway, Burnaby, BC V5H 2E6');

    for (var i = 0; i < rentalList.length; ++i) {
      this.decodeAndMarkAddress(geocoder, infoWindow, google, rentalList[i], map);
    }
  }

  handleLocationError(browserHasGeolocation, infoWindow, map) {
    infoWindow.setPosition(map.getCenter());
    infoWindow.setContent(browserHasGeolocation ?
              'Error: The Geolocation service failed.' :
              'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
  
  decodeAndMarkAddress(geocoder, infoWindow, google, address, map) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        console.log("ready to do marker: " + results[0].geometry.location);
        let marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location});

        var locationURL = "";

        var infoWindowHTML = " \
          <div class='info-window'>\
            <div class='col1'>\
              < div class='title'>Beautiful SeaView House</div><br/>\
              <div class='features'>" + address + "</div><br/>\
              <a class='loc-detail' href='" + locationURL + "'>View place details</a>\
            </div>\
            <div class='col-2'>thumbnailURL</div>\
          </div>\
        ";

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(infoWindowHTML);
          infoWindow.open(map, marker);
        });

        return marker;
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  render() {
    console.log("map react locations from parent:" + this.props.locations.length);

    return (
      <Map google={this.props.google} 
           zoom={14}
           onReady={this.fetchCurrentLocation} >

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_1Rq6A6BV8gzzxRtd7rgpOpRkSw1i8yQ'
})(MapContainer)