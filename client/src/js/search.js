import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {search: '',
      location: [
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
        }
      ]};

    // This binding is necessary to make `this` work in the callback
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.setState({search: data.get('search')}, function(){
      console.log('A place is searched: ' + this.state.search);});
  }

  render() {
    return (
      <div id='searchbox' style = {{padding: 5}}>
        <form onSubmit={this.handleSubmit}>
          {/* <label>Search:</label> */}
          <InputGroup size="sm" className="mb-3">
            <DropdownButton as={InputGroup.Prepend} variant="success" title="Filter" id="search-dropdown">
              {this.state.location.map((item) => (
                <Dropdown.Item href="#" key={item.id}>
                  {item.position}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <FormControl name="search" aria-describedby="basic-addon1" placeholder='where to go'>
            </FormControl>
          </InputGroup>
          {/* <input type="submit" value='Go'></input> */}
          <Button as="input" type="submit" value="Go" size="sm" block />
        </form>
      </div>
    );
  }
}