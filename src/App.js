import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import MainPage from './components/MainPage/MainPage';
import BookingPage from './components/BookingPage/BookingPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBookingPageOpen: false
    };
  }

  showBookingPage = id => {
    this.setState({ isBookingPageOpen: true, movieId: id });
  };

  render() {
    const history = createBrowserHistory();
    return (
      <div className="wrapper">
        <Router history={history}>
          <div className={this.state.isBookingPageOpen ? 'for-blur' : ''}>
            <Header onLogin={this.openLoginForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/" component={MainPage} />
          </div>
          <Route path="/schedule/movie/:movieId" component={BookingPage} />
        </Router>
      </div>
    );
  }
}

export default App;
