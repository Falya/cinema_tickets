import React, { Component } from 'react';
import '../components/MainPage/main-page.scss';
import MovieList from '../components/MainPage/MovieList/MovieList';
import { withRouter } from 'react-router-dom';

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

export default withRouter(MainPage);
