import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import MoviePage from './components/MoviePage/MoviePage';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className="for-blur">
        <Header />
        <MainPage />
        </div>
        <MoviePage />
      </div>
    );
  }
}

export default App;
