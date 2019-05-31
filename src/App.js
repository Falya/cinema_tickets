import React, { Component } from 'react';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import BookinPage from './components/BookingPage/BookingPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBookingPageOpen: false,
      movieId: ''
    };
  }

  onBookingPageCrossClick = () => {
    this.setState({isBookingPageOpen: false});
  }

  showBookingPage = (id) => {
    this.setState({isBookingPageOpen: true, movieId: id});
  }

  render() {
    return (
      <div className='wrapper'>
        <div className={this.state.isBookingPageOpen ? 'for-blur' : ''}>
        <Header />
        <MainPage showBookingPage={this.showBookingPage}/>
        </div>
        {this.state.isBookingPageOpen && <BookinPage movieId={this.state.movieId} onCrossClick={this.onBookingPageCrossClick}/>}
      </div>
    );
  }
}

export default App;
