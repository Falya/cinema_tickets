import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieCard from './MovieCard';
import { getMoviesApi } from '../../../redux/actions/actions';

const mapStateTOProps = ({ moviesReducer }) => {
  return { movies: moviesReducer.movies };
};
class ConnectedMovieList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getMoviesApi();
  }

  rederMovieCards = movies => {
    return movies.map(movie => <MovieCard movie={movie} />);
  };

  render() {
    const { movies } = this.props;
    return (
      <div className="heading">
        <div className="heading-header">
          <h2>Now in the cinema</h2>
        </div>
        <div className="heading-body">{this.rederMovieCards(movies)}</div>
      </div>
    );
  }
}

const MovieList = connect(
  mapStateTOProps,
  { getMoviesApi }
)(ConnectedMovieList);

export default MovieList;
