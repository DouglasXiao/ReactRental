'use strict';

const InputGroup = ReactBootstrap.InputGroup;
const DropdownButton = ReactBootstrap.DropdownButton;
const Dropdown = ReactBootstrap.Dropdown;
const FormControl = ReactBootstrap.FormControl;

class SearchBox extends React.Component {
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
          <label>Search:</label>
          <InputGroup size="lg" className="mb-3">
            <DropdownButton as={InputGroup.Prepend} variant="success" title="Filter" id="search-dropdown">
              {this.state.location.map((item) => (
                <Dropdown.Item href="#" key={item}>
                  {item.position}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <FormControl name="search" aria-describedby="basic-addon1" placeholder='where to go'>
            </FormControl>
          </InputGroup>
          <input type="submit" value='Go'></input>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<SearchBox />, document.getElementById('search'));