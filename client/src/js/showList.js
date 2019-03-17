import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default class SearchList extends Component {
  render() {
    console.log("show list from parent:" + this.props.locations.length);
    return (
      <div className="SearchList">
        <ListGroup as="ul">
            {this.props.locations.map((item) => (
              <ListGroup.Item as="li" key={item.id} variant="success">
                {item.position}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    );
  }
}