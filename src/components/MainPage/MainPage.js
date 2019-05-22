import React, { Component } from 'react';
import './main-page.scss';
import Heading from './Heading/Heading';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Heading/>
      </section>
    );
  }
}

export default MainPage;
