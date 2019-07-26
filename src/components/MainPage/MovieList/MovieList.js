import React, { Component } from 'react';
import MovieCard from './MovieCard';
import MovieSlider from './MovieSlider';

class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  rederMovieCards = movies => {
    return movies.map(movie => <MovieCard movie={movie} />);
  };

  render() {
    const { movies, headingName } = this.props;
    return (
      <div className="heading">
        <div className="heading-header">
          <h2>{headingName}</h2>
        </div>
        <MovieSlider>{this.rederMovieCards(movies)}</MovieSlider>
      </div>
    );
  }
}

export default MovieList;
