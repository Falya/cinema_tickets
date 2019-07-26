import React, { Component } from 'react';
import '../components/MainPage/main-page.scss';
import MovieList from '../components/MainPage/MovieList/MovieList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMoviesApi } from '../redux/actions/actions';

const mapStateToProps = ({ moviesReducer }) => {
  return { movies: moviesReducer.movies };
};

class ConnectedMainPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMoviesApi();
  }

  render() {
    const { movies } = this.props;
    return (
      !!movies.currentMovies.length && (
        <section>
          <MovieList headingName={`Now in the cinema`} movies={movies.currentMovies} />
          <MovieList headingName={`Coming soon`} movies={movies.featureMovies} />
        </section>
      )
    );
  }
}

const MainPage = connect(
  mapStateToProps,
  { getMoviesApi }
)(ConnectedMainPage);

export default withRouter(MainPage);
