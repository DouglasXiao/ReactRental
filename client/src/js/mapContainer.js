import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import io from 'socket.io-client';
 
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

    // Set listener to user search places
    var whereToGoInput = document.getElementById('form');
    var searchBox = new google.maps.places.SearchBox(whereToGoInput);
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      places.forEach(function(place) {
        map.setCenter(place.geometry.location);

        let marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location});

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(place.name);
          infoWindow.open(map, marker);
        });
      });
    })

    // Mark the location list iteratively
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

    // Get data from nodejs backend, and mark them in React frontend
    // TODO: Refactor this code into SearchBox, and each time release the client socket && when user search a new place, callback to new a client socket
    const socket = io('http://localhost:8888');
    socket.on('serverToClientChannel', function (data) {
      console.log("socket io get data: " + data.lat + " " + data.lng);
      console.log("Location URL: " + data.locationUrl);

      var theLatLng = new google.maps.LatLng(data.lat, data.lng);

      let marker = new google.maps.Marker({
        map: map,
        position: theLatLng});

      var infoWindowHTML = " \
        <div class='info-window'>\
          <div class='col1'>\
            <div class='title'>"+ data.title + "</div><br/>\
            <div class='features'>" + (data.address !== null ? data.address : '') + "</div><br/>\
            <a class='loc-detail' href='" + data.locationUrl + "'>View place details</a>\
          </div>\
          <div class='col-2'><img src=" + data.thumbnail + "/></div>\
        </div>\
      ";

      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(infoWindowHTML);
        infoWindow.open(map, marker);
      });

      socket.emit('clientToServerChannel', {my : 'data'});
    });

    /*var rentalList = [];
    rentalList.push('6058 selma ave, burnaby, bc, canada');
    rentalList.push('6033 selma ave, burnaby, bc, canada');
    rentalList.push('5175 Kingsway, Burnaby, BC V5H 2E6');

    for (var i = 0; i < rentalList.length; ++i) {
      this.decodeAndMarkAddress(geocoder, infoWindow, google, rentalList[i], map);
    }*/
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
              <div class='title'>Beautiful SeaView House</div><br/>\
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

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  render() {
    return (
      <Map google={this.props.google}
           zoom={15}
           onReady={this.fetchCurrentLocation} />
    );
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_1Rq6A6BV8gzzxRtd7rgpOpRkSw1i8yQ'
})(MapContainer)
