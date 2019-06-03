import React, { Component } from 'react';
import './booking-page.scss';
import FilterComponent from './FilterComponent';
import MovieTheaterSeances from './MovieTheaterSeances';
import { getSeancesByMovieId } from '../../webAPI';

class BookingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      movieObject: {}
    };

    getSeancesByMovieId(this.props.movieId).then(res => {
      this.setState({ movieObject: res, loading: false });
    });
  }

  renderMovieTheaters = theaters => {
    return theaters.map(theater => {
      return <MovieTheaterSeances movieTheater={theater} key={theater._id} />;
    });
  };

  render() {
    const { loading } = this.state;
    let movie;
    !loading && ({ movie } = this.state.movieObject);

    return (
      <section className="booking_page">
        <div className="booking_page__wrapper">
          <div className="booking_page__header">
            <div className="header__nav_bar">
              <div className="nav_bar__back_btn">
                <span>🡨</span>
              </div>
              <div className="nav_bar__title">
                <h3>{!loading && movie.name}</h3>
              </div>
              <div className="nav_bar__close_btn">
                <span onClick={this.props.onCrossClick}>🞬</span>
              </div>
            </div>
          </div>
          <div className="header__filter_bar">
            <FilterComponent type="city" />
            <FilterComponent type="city" />
            <FilterComponent type="city" />
            <FilterComponent type="city" />
          </div>
          <div className="booking_page__body">
            <div className="body_left_container">
              <div className="movie">
                <div className="movie__poster">
                  <div className="poster__image">
                    <img src={!loading ? movie.poster : undefined} alt="" />
                  </div>
                </div>
                <div className="movie__info">
                  <h1>{!loading && movie.name}</h1>
                  {!loading && (
                    <span>
                      {movie.genre.join(', ')} / {movie.age}+ / {movie.duration}min
                    </span>
                  )}
                </div>
              </div>
              <div className="movie__seances">{!loading && this.renderMovieTheaters(this.state.movieObject.theaters)}</div>
            </div>
            <div className="body_right_container">
              <div className="description">
                <div className="movie_trailer_preview">
                  <div className="movie_trailer_preview__overlay">
                    <svg height="50%" viewBox="0 0 200 200" alt="Play video">
                      <circle cx="100" cy="100" r="90" fill="none" strokeWidth="15" />
                      <polygon points="70, 55 70, 145 145, 100" fill="#fff" />
                    </svg>
                  </div>
                  {<img src="https://i.ytimg.com/vi/TXuuWMDqBak/maxresdefault.jpg" alt="" />}
                </div>
                <div className="movie_description">
                  <h3>{!loading && movie.name}</h3>
                  <span>{!loading && movie.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BookingPage;
