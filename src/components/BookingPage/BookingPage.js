import React, { Component } from 'react';
import './booking-page.scss';
import MovieTheaterSeances from './MovieTheaterSeances';
import { getSeancesByMovieId, getMovieById } from '../../webAPI';
import FilterNavBar from './FilterNavBar';

class BookingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      movie: null,
      movieTheaters: null,
      filterParameters: {
        city: '5cee54941c9d44000002fca6',
        movieTheaterId: 'All cinemas',
        movieId: this.props.movieId,
        features: null,
        date: (new Date()).toISOString(),
      }
    };

    this.getMovie(this.props.movieId);
    this.getSeances(this.state.filterParameters);

  }

  getMovie = (movieId) => {
    getMovieById(movieId).then(movie=> {
      this.setState({ movie: movie, loading: false });
    });
  }

  getSeances = (parameters) => {
    getSeancesByMovieId(parameters).then(theaters => {
      console.log(theaters);
      this.setState({movieTheaters: theaters});
    });
  }


  renderMovieTheaters = theaters => {
    return theaters.map(theater => {
      return <MovieTheaterSeances movieTheater={theater} key={theater._id} />;
    });
  };

  getFilterParametrs = (filterParameters) => {
    this.setState({filterParameters});
  };

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.filterParameters.movieId !== this.state.filterParameters.movieId) {
      console.log('updated');
      this.setState({loading: true});
      this.getMovie(nextState.filterParameters.movieId);
      this.getSeances(nextState.filterParameters);
      return true;
    }

    return nextState !== this.state;
  }



  render() {
    const { loading, movie,  movieTheaters } = this.state;
    console.log(this.state.filterParameters);
    return (
      <section className="booking_page">
        {loading && <span className="icon-spinner2 page_spiner"></span>}
        <div className="booking_page__wrapper">
          <div className="booking_page__header">
            <div className="header__nav_bar">
              <div className="nav_bar__back_btn">
                <span className="icon-arrow-left"></span>
              </div>
              <div className="nav_bar__title">
                <h3>{movie && movie.name}</h3>
              </div>
              <div className="nav_bar__close_btn">
                <span className="icon-cross" onClick={this.props.onCrossClick}></span>
              </div>
            </div>
          </div>
          <FilterNavBar parameters={this.state.filterParameters} onChangeMethod={this.getFilterParametrs}/>
          {movie && <div className="booking_page__body">
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
          </div>}
        </div>
      </section>
    );
  }
}

export default BookingPage;
