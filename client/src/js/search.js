import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import SearchList from './showList.js';
import MapContainer from './mapContainer.js';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.whereToGo = "searchBar";

    this.state = {search: '',
      locations: [
        {
            id: 0,
            position: 'California',
            selected: false,
            key: 'location'
        },
        {
          id: 1,
          position: 'Vancouver',
          selected: false,
          key: 'location'
        },
        {
            id: 2,
            position: 'Burnaby',
            selected: false,
            key: 'location'
        }
      ]};

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.setState({search: data.get(this.whereToGo)}, function(){
      console.log('A place is searched: ' + this.state.search);
    });
  }

  render() {
    return (
      <div id='wholepage'>
        <div id='searchbox' className="left" style = {{padding: 5}}>
          <div id='searchbar'>
            <form onSubmit={this.handleSubmit}>
              <InputGroup size="sm" className="mb-3">
                <DropdownButton as={InputGroup.Prepend} variant="success" title="Filter" id="search-dropdown">
                  {this.state.locations.map((item) => (
                    <Dropdown.Item href="#" key={item.id}>
                      {item.position}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <FormControl id='form' name={this.whereToGo} aria-describedby="basic-addon1" placeholder='where to go'>
                </FormControl>
              </InputGroup>
            </form>
          </div>

          <p></p>

          <div id='searchList'>
            <SearchList locations={this.state.locations} />
          </div>
        </div>
        
        <div className="right">
          <MapContainer location={this.state.search} />
        </div>
      </div>
    );
  }
}