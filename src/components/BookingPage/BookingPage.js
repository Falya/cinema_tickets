import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './booking-page.scss';
import MovieTheaterSeances from './MovieTheaterSeances';
import { getSeancesByMovieId, getMovieById } from '../../webAPI';
import FilterNavBar from './Filters/FilterNavBar';

class BookingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      movie: null,
      movieTheaters: null,
      filterParameters: {
        city: null,
        movieTheaterId: 'All cinemas',
        movieId: this.props.match.params.movieId,
        features: null,
        date: new Date().toISOString()
      }
    };
  }

  getMovie = movieId => {
    getMovieById(movieId).then(movie => {
      this.setState({ movie: movie });
    });
  };

  getSeances = parameters => {
    getSeancesByMovieId(parameters).then(theaters => {
      this.setState({ movieTheaters: theaters, loading: false });
    });
  };

  renderMovieTheaters = theaters => {
    return theaters.map(theater => {
      return <MovieTheaterSeances movieTheater={theater} key={theater._id} />;
    });
  };

  setFilterParameters = filterParameters => {
    this.setState({ filterParameters });
  };

  onCloseButton = () => {
    this.props.history.replace('/');
  };

  onBackButton = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.getMovie(this.props.match.params.movieId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isFilterParameterChanged = nextState.filterParameters !== this.state.filterParameters;
    const isMovieIdChanged = nextState.filterParameters.movieId !== this.state.filterParameters.movieId;
    const isLocationChanged = nextProps.location !== this.props.location;
    if (isMovieIdChanged) {
      this.props.history.push(`/schedule/movie/${nextState.filterParameters.movieId}`);
    }
    if (isFilterParameterChanged || isLocationChanged) {
      this.setState({ loading: true });
      if (isLocationChanged) {
        nextState.filterParameters.movieId = nextProps.match.params.movieId;
        this.getMovie(nextProps.match.params.movieId);
      }
      this.getSeances(nextState.filterParameters);
      return true;
    }

    return nextState !== this.state;
  }

  render() {
    const { loading, movie, movieTheaters } = this.state;

    return (
      <section className="booking_page">
        {loading && <span className="icon-spinner2 page_spiner" />}
        <div className="booking_page__wrapper">
          <div className="booking_page__header">
            <div className="header__nav_bar">
              <div className="nav_bar__back_btn" onClick={this.onBackButton}>
                <span className="icon-arrow-left" />
              </div>
              <div className="nav_bar__title">
                <h3>{movie && movie.name}</h3>
              </div>
              <div className="nav_bar__close_btn">
                <span className="icon-cross" onClick={this.onCloseButton} />
              </div>
            </div>
          </div>
          <FilterNavBar parameters={this.state.filterParameters} onChangeMethod={this.setFilterParameters} />
          {movie && (
            <div className="booking_page__body">
              <div className="body_left_container">
                <div className="movie">
                  <div className="movie__poster">
                    <div className="poster__image">
                      <img src={movie.poster} alt="" />
                    </div>
                  </div>
                  <div className="movie__info">
                    <h1>{movie.name}</h1>
                    <span>
                      {movie.genre.join(', ')} / {movie.age}+ / {movie.duration}min
                    </span>
                  </div>
                </div>
                <div className="movie__seances">{movieTheaters && this.renderMovieTheaters(movieTheaters)}</div>
              </div>
              <div className="body_right_container">
                <div className="description">
                  <div className="movie_trailer_preview">
                    <div className="movie_trailer_preview__overlay">
                      <span className="icon-play2" />
                    </div>
                    <img src="https://i.ytimg.com/vi/TXuuWMDqBak/maxresdefault.jpg" alt="" />
                  </div>
                  <div className="movie_description">
                    <h3>{movie.name}</h3>
                    <span>{movie.description}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

export default withRouter(BookingPage);
