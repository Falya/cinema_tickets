import React, { Component } from 'react';
import './main-page.scss';
import MovieList from './MovieList/MovieList';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  cardMethod = (id, method) => {
    const showBookingPage = 'showBookingPage',
          showMoviePage = 'showMoviePage';

    if (method === showBookingPage) {
      console.log(`Open boking page for ${id}`);
    } else if (method === showMoviePage) {
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
