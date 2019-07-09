import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import LoginForm from '../views/LoginForm/LoginForm';
import RegistrationForm from '../views/RegistrationForm/RegistrationForm';
import MainPage from '../views/MainPage';
import BookingPage from '../views/BookingPage';
import SeatSelectionPage from './SeatSelectionPage/SeatSelectionPage';

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
          <Switch>
            <Route exact path="/schedule/movie/:movieId" component={BookingPage} />
            <Route path="/schedule/movie/:movieId/seance/:seanceId" component={SeatSelectionPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const App = connect(mapStateToProps)(ConnectedApp);
export default App;
