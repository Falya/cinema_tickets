import React, { Component } from 'react';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import MainPage from './components/MainPage/MainPage';
import BookingPage from './components/BookingPage/BookingPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginForm: false,
      registrationForm: false,
      isBookingPageOpen: false,
      movieId: ''
    };
  }

  openLoginForm = () => {
    this.setState({ loginForm: true });
  };

  openRegistrationForm = () => {
    this.setState({ registrationForm: true });
  };

  onBookingPageCrossClick = () => {
    this.setState({ isBookingPageOpen: false });
  };

  showBookingPage = id => {
    this.setState({ isBookingPageOpen: true, movieId: id });
  };

  render() {
    return (
      <div className="wrapper">
        <div className={this.state.isBookingPageOpen ? 'for-blur' : ''}>
          <Header onLogin={this.openLoginForm} onRegistration={this.openRegistrationForm} />
          {this.state.loginForm && <LoginForm />}
          {this.state.registrationForm && <RegistrationForm />}
          <MainPage showBookingPage={this.showBookingPage} />
        </div>
        {this.state.isBookingPageOpen && <BookingPage movieId={this.state.movieId} onCrossClick={this.onBookingPageCrossClick} />}
      </div>
    );
  }
}

export default App;
