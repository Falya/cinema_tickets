import { Component } from "react";

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      matches: []
    };
  }

  search() {
    fetch("/dbImitation/films.json")
      .then(res => res.json())
      .then(res => {
        const matches = res.films.filter(film => this.state.searchTerm && film.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
        this.setState({ matches });
      });
  }

  onSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
    this.search();
  };

  showMatches = () => {
    let { matches } = this.state;

    return matches.map(item => (
      <div onClick={this.selectMatch}>{item.name}</div>
    ));
  };

  selectMatch = e => {
    this.setState({ searchTerm: e.target.textContent, matches: [] });
  };

  render() {
    return (
      <form className={this.props.className}>
        <label htmlFor="search-field">Search</label>
        <div>
          <input
            type="text"
            id="search-field"
            autoComplete='off'
            onChange={this.onSearch}
            value={this.state.searchTerm}
          />
          {this.state.matches.length > 0 && (
            <div>
              <div className="matches">{this.showMatches()}</div>
            </div>
          )}
        </div>
        <button>Search</button>
      </form>
    );
  }
}

export default SearchField;
