import React, { Component } from 'react';
import './main-page.scss';
import MovieList from './MovieList/MovieList';
const SHOW_BOOKING_PAGE = 'showBookingPage',
      SHOW_MOVIE_PAGE = 'showMoviePage';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  cardMethod = (id, method) => {

    if (method === SHOW_BOOKING_PAGE) {
      console.log(`Open booking page for ${id}`);
    } else if (method === SHOW_MOVIE_PAGE) {
      console.log(`Open movie page for ${id}`);
    }
  };

  render() {
    return (
      <section>
        <MovieList cardMethod={this.cardMethod} />
      </section>
    );
  }
}

export default MainPage;
