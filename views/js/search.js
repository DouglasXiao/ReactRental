'use strict';

const e = React.createElement;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '', search: ''};

    // This binding is necessary to make `this` work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({content: this.state.content + event.target.value}, function(){
      console.log('Input changes to: ' + this.state.content);});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({search: this.state.content}, function(){
      console.log('A place is submitted: ' + this.state.search);});
    this.state.content = '';
  }

  render() {
    return (
      <div id='searchbox' style = {{padding: 5}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search:
            <input type="text" name="search" value={this.state.search}
              placeholder={this.state.content = '' ? 'where to go' : this.state.content}
              style = {{width: 100, height: 30}} onChange={this.handleChange}></input>
          </label>
          <input type="submit" value='Go'></input>
        </form>
      </div>
    );
  }
}

const domContainer = document.querySelector('#search');
ReactDOM.render(e(SearchBox), domContainer);