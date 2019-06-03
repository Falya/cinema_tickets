import React, { Component } from 'react';
import './main-page.scss';
import Heading from './Heading/Heading';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  cardMethod = (id, method) => {
    if (method === 'showBookingPage') {
      this.props.showBookingPage(id);
    } else if (method === 'showMoviePage') {
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
