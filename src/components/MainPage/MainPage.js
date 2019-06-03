import React, { Component } from 'react';
import './main-page.scss';
import Heading from './Heading/Heading';
const SHOW_BOOKING_PAGE = 'showBookingPage';
const SHOW_MOVIE_PAGE = 'showMoviePage';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  cardMethod = (id, method) => {
    if (method === SHOW_BOOKING_PAGE) {
      this.props.showBookingPage(id);
    } else if (method === SHOW_MOVIE_PAGE) {
      console.log(`Open movie page for ${id}`);
    }
  };

  render() {
    return (
      <section>
        <Heading cardMethod={this.cardMethod} />
      </section>
    );
  }
}

export default MainPage;
