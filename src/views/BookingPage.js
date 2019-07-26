import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import '../components/BookingPage/booking-page.scss';
import MovieTheaterSeances from '../components/BookingPage/MovieTheaterSeances';
import FilterNavBar from '../components/BookingPage/Filters/FilterNavBar';
import { getMovieApi, setMovieId, setBlur, setOrderFeature } from '../redux/actions/actions';

const mapStateToProps = state => {
  return {
    loading: state.loadingStateReducer.loading,
    movie: state.movieReducer.movie,
    movieTheaters: state.seancesReducer.movieTheaters,
    movieId: state.filterParamsReducer.filterParameters.movieId,
  };
};

class ConnectedBookingPage extends Component {
  constructor(props) {
    super(props);
  }

  getMovie = movieId => {
    this.props.getMovieApi(movieId);
  };

  renderMovieTheaters = theaters => {
    return theaters.map(theater => {
      return <MovieTheaterSeances movieTheater={theater} key={theater._id} />;
    });
  };

  onCloseButton = () => {
    this.props.history.replace('/');
  };

  onBackButton = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    this.props.setBlur(true);
    this.props.setMovieId(this.props.match.params.movieId);
    this.props.setOrderFeature([]);
  }

  componentWillUnmount() {
    this.props.setBlur(false);
    this.props.setMovieId(null);
  }

  shouldComponentUpdate(nextProps) {
    const isMovieIdChanged = nextProps.movieId !== this.props.movieId;
    const isLocationChanged = nextProps.location !== this.props.location;
    if (isMovieIdChanged && this.props.movieId) {
      this.props.history.push(`/schedule/movie/${nextProps.movieId}`);
    }

    if (isMovieIdChanged) {
      this.getMovie(nextProps.movieId);
    }

    if (isLocationChanged) {
      this.props.setMovieId(nextProps.match.params.movieId);
    }

    return nextProps !== this.props;
  }

  render() {
    const { loading, movie, movieTheaters } = this.props;
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
          <FilterNavBar />
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

const BookingPage = connect(
  mapStateToProps,
  { getMovieApi, setMovieId, setBlur, setOrderFeature }
)(ConnectedBookingPage);

export default withRouter(BookingPage);
