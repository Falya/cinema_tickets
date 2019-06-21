import React, { Component } from 'react';
import './main-page.scss';
import MovieList from './MovieList/MovieList';

class MainPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <MovieList />
      </section>
    );
  }
}

export default MainPage;
