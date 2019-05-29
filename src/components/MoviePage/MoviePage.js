import React, { Component } from 'react';
import './movie-page.scss';
import FilterComponent from './FilterComponent';
import CinemaSeance from './CinemaSeance';

class MoviePage extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <section className='movie-page'>
        <div className="movie-page--wrapper">
          <div className="movie-page--header">
            <div className="header--nav-bar">
              <div className="nav-bar--back-btn">
                <span>🡨</span>
              </div>
              <div className="nav-bar--title">
                <h3>Avengers</h3>
              </div>
              <div className="nav-bar--close-btn">
                <span>🞬</span>
              </div>
            </div>
          </div>
          <div className="header--filter-bar">
              <FilterComponent type='city'/>
              <FilterComponent type='city'/>
              <FilterComponent type='city'/>
              <FilterComponent type='city'/>
            </div>
          <div className="movie-page--body">
            <div className="body-left-container">
              <div className="movie-about">
                <div className="movie-poster">
                  <div className="poster-image">
                    <img src="http://cdn.collider.com/wp-content/uploads/2018/03/avengers-infinity-war-poster.jpg" alt=""/>
                  </div>
                </div>
                <div className="movie-info">
                  <h1>Avengers: Endgame</h1>
                    <span>fantasy, action / 6+ / 2h 20min</span>
                </div>
              </div>
              <div className="movie-seances">
                  <CinemaSeance />
                  <CinemaSeance />
                  <CinemaSeance />
                  <CinemaSeance />
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
                  <img src="https://i.ytimg.com/vi/TXuuWMDqBak/maxresdefault.jpg" alt=""/>
                </div>
                <div className="description">
                  <h3>Avengers: Endgame</h3>
                  <span> After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos' actions and restore order to the universe.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default MoviePage;
