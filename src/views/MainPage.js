import React, { Component } from 'react';
import '../components/MainPage/main-page.scss';
import MovieList from '../components/MainPage/MovieList/MovieList';

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
