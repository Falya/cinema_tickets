import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
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
        <Router>
          <div className={this.state.isBookingPageOpen ? 'for-blur' : ''}>
            <Header onLogin={this.openLoginForm} onRegistration={this.openRegistrationForm} />
            {this.state.loginForm && <LoginForm />}
            {this.state.registrationForm && <RegistrationForm />}
            <Route path='/' component={MainPage} />
            {/* <MainPage showBookingPage={this.showBookingPage} /> */}
          </div>
          <Route path='/affiche/movie/:movieId' component={BookingPage}/>
          {/* {this.state.isBookingPageOpen && <BookingPage movieId={this.state.movieId} onCrossClick={this.onBookingPageCrossClick} />} */}
        </Router>
      </div>
    );
  }
}

export default App;
