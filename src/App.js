import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        <Header />
        <MainPage />
      </div>
    );
  }
}

export default App;
