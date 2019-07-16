import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    movies: state.moviesReducer.movies,
  };
};

class ConnectedSearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalInput: '',
      searchTerm: '',
      matches: [],
      selected: null,
      currentFocus: 0,
    };
  }

  filterMovies = searchTerm => {
    const { currentMovies, featureMovies } = this.props.movies;
    if (searchTerm) {
      const regExp = new RegExp(`(:?^|\\s)+${searchTerm}`, 'ig');
      const matches = [...currentMovies, ...featureMovies]
        .filter(movie => searchTerm && movie.name.match(regExp))
        .sort();

      this.setState({ matches });
    } else {
      this.setState({ matches: [] });
    }
  };

  onInput = e => {
    this.setState({ searchTerm: e.target.value, currentFocus: 0, originalInput: e.target.value });
    this.filterMovies(e.target.value);
  };

  showMatches = () => {
    let { matches } = this.state;
    matches.length > 5 && (matches.length = 5);

    return matches.map((item, index) => (
      <div onClick={this.selectMatch} key={index} className={index === this.state.currentFocus - 1 ? 'hovered' : ''}>
        {item.name}
      </div>
    ));
  };

  selectMatch = e => {
    const [movie] = this.state.matches.filter(movie =>
      movie.name.toLowerCase().startsWith(e.target.textContent.toLowerCase())
    );

    this.setState({ searchTerm: e.target.textContent, matches: [], selected: movie });
  };

  openMovie = movie => {
    const url = `/schedule/movie/${movie._id}`;
    this.props.history.push(url);
    this.setState({ selected: null, searchTerm: '', currentFocus: 0, matches: [], originalInput: '' });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.selected) {
      this.openMovie(this.state.selected);
    }
  };

  onKeyDown = e => {
    const { currentFocus, matches } = this.state;
    if (e.keyCode === 40) {
      e.preventDefault();
      if (currentFocus < matches.length && matches.length) {
        this.setState({ currentFocus: this.state.currentFocus + 1 });
      }
    } else if (e.keyCode === 38) {
      e.preventDefault();
      if (matches.length - currentFocus < matches.length && matches.length) {
        this.setState({ currentFocus: this.state.currentFocus - 1 });
      }
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.selected && nextState.selected !== this.state.selected && !nextState.currentFocus) {
      this.openMovie(nextState.selected);
    }

    if (nextState.currentFocus !== this.state.currentFocus) {
      if (nextState.currentFocus) {
        const movie = nextState.matches[nextState.currentFocus - 1];
        this.setState({ searchTerm: movie.name, selected: movie });
      } else {
        this.setState({ searchTerm: nextState.originalInput, selected: null });
      }
    }
    return this.state !== nextState;
  }

  render() {
    return (
      <form className={this.props.className} onSubmit={this.onSubmit} onKeyDown={this.onKeyDown}>
        <label htmlFor="search-field">Search</label>
        <div>
          <input
            type="text"
            id="search-field"
            autoComplete="off"
            onChange={this.onInput}
            value={this.state.searchTerm}
          />
          {this.state.matches.length > 0 && (
            <div>
              <div className="matches">{this.showMatches()}</div>
            </div>
          )}
        </div>
        <button>Go</button>
      </form>
    );
  }
}

const SearchField = connect(mapStateToProps)(ConnectedSearchField);

export default withRouter(SearchField);
