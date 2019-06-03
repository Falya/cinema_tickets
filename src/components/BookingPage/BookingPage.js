import React, { Component } from 'react';
import './booking-page.scss';
import FilterComponent from './FilterComponent';
import MovieTheaterSeances from './MovieTheaterSeances';
import { getSeancesByMovieId } from '../../webAPI';


class BookingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDataLoaded: false,
     };

     getSeancesByMovieId(this.props.movieId)
      .then(res => {
        this.setState({movieObject: res, isDataLoaded: true});
      });
  }

  renderMovieTheaters = (theaters) => {
    return theaters.map(theater => {
      return <MovieTheaterSeances movieTheater={theater} key={theater._id}/>;
    });
  }

  render() {
    const {isDataLoaded} = this.state;
    let movie;
    isDataLoaded && ({movie} = this.state.movieObject);

    return (
      <section className='booking-page'>
        <div className="booking-page--wrapper">
          <div className="booking-page--header">
            <div className="header--nav-bar">
              <div className="nav-bar--back-btn">
                <span>🡨</span>
              </div>
              <div className="nav-bar--title">
                <h3>{isDataLoaded && movie.name}</h3>
              </div>
              <div className="nav-bar--close-btn">
                <span onClick={this.props.onCrossClick}>🞬</span>
              </div>
            </div>
          </div>
          <div className="header--filter-bar">
              <FilterComponent type='city'/>
              <FilterComponent type='city'/>
              <FilterComponent type='city'/>
              <FilterComponent type='city'/>
            </div>
          <div className="booking-page--body">
            <div className="body-left-container">
              <div className="movie-about">
                <div className="movie-poster">
                  <div className="poster-image">
                    <img src={isDataLoaded ? movie.poster : undefined} alt=""/>
                  </div>
                </div>
                <div className="movie-info">
                  <h1>{isDataLoaded && movie.name}</h1>
                    {isDataLoaded && <span>{movie.genre.join(', ')} / {movie.age}+ / {movie.duration}min</span>}
                </div>
              </div>
              <div className="movie-seances">
                  {isDataLoaded && this.renderMovieTheaters(this.state.movieObject.theaters)}
              </div>
            </div>
            <div className="body-right-container">
              <div className="movie-description">
                <div className="movie-trailer-preview">
                  <div className="trailer-overlay">
                  <svg height='50%' viewBox="0 0 200 200" alt="Play video">
                        <circle cx="100" cy="100" r="90" fill="none" strokeWidth="15"/>
                        <polygon points="70, 55 70, 145 145, 100" fill="#fff"/>
                    </svg>
                  </div>
                  {<img src="https://i.ytimg.com/vi/TXuuWMDqBak/maxresdefault.jpg" alt=""/>}
                </div>
                <div className="description">
                  <h3>{isDataLoaded && movie.name}</h3>
                  <span>{isDataLoaded && movie.description}</span>
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
