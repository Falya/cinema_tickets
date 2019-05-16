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
      .then(res => {
        return res.json();
      })
      .then(res => {
        let current = res.films.filter(film => {
          let { searchTerm } = this.state,
            { name } = film;

          if (searchTerm && name.toLowerCase().includes(searchTerm.toLowerCase())) {
           return true;
          }

        });

        this.setState({ matches: current });
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
      <div className={this.props.className}>
        <label htmlFor="search-field">Search</label>
        <div>
          <input
            type="text"
            id="search-field"
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
      </div>
    );
  }
}

export default SearchField;
