import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import LoginForm from './LoginForm/LoginForm';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import MainPage from './MainPage/MainPage';
import BookingPage from './BookingPage/BookingPage';

const mapStateToProps = state => {
  return { isBlur: state.blurReducer.isBlur };
};

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <Router>
          <div className={this.props.isBlur ? 'for-blur' : ''}>
            <Header />
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

const App = connect(mapStateToProps)(ConnectedApp);
export default App;
