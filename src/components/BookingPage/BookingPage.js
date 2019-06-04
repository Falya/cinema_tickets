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
      movie: null,
      movieTheaters: null
    };

    getSeancesByMovieId(this.props.movieId).then(res => {
      this.setState({ movie: res.movie, movieTheaters: res.theaters, loading: false });
    });
  }

  renderMovieTheaters = theaters => {
    return theaters.map(theater => {
      return <MovieTheaterSeances movieTheater={theater} key={theater._id} />;
    });
  };

  render() {
    const { loading, movie,  movieTheaters } = this.state;

    return (
      <section className="booking_page">
        {loading && <span className="icon-spinner2 page_spiner"></span>}
        {movie && <div className="booking_page__wrapper">
          <div className="booking_page__header">
            <div className="header__nav_bar">
              <div className="nav_bar__back_btn">
                <span className="icon-arrow-left"></span>
              </div>
              <div className="nav_bar__title">
                <h3>{movie.name}</h3>
              </div>
              <div className="nav_bar__close_btn">
                <span className="icon-cross" onClick={this.props.onCrossClick}></span>
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
                    <span className='icon-play2'></span>
                  </div>
                  {<img src="https://i.ytimg.com/vi/TXuuWMDqBak/maxresdefault.jpg" alt="" />}
                </div>
                <div className="movie_description">
                  <h3>{movie.name}</h3>
                  <span>{movie.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </section>
    );
  }
}

export default BookingPage;
