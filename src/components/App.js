import React, { Component } from 'react';
import 'babel-polyfill';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import LoginForm from '../views/LoginForm/LoginForm';
import RegistrationForm from '../views/RegistrationForm/RegistrationForm';
import MainPage from '../views/MainPage';
import BookingPage from '../views/BookingPage';
import SeatSelectionPage from './SeatSelectionPage/SeatSelectionPage';
import { getUserName, resetUserName } from '../redux/actions/actions';
import UserProfilePage from '../views/UserProfilePage/UserProfilePage';
import ScrollToTop from './ScrollToTop';
import message from 'antd/lib/message';

const mapStateToProps = state => {
  return {
    isBlur: state.blurReducer.isBlur,
    userName: state.userNameReducer.userName,
    loading: state.loadingStateReducer.loading,
  };
};

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { token } = localStorage;
    if (token) {
      this.props.getUserName();
    }

    window.addEventListener('storage', e => {
      if (e.key === 'token') {
        if (localStorage.token) {
          message.info('You are logged in', 5);
          this.props.getUserName();
        } else {
          message.info('You are logged out', 5);
          this.props.resetUserName();
        }
      }
    });
  }

  shouldComponentUpdate(nextProps) {
    const { token } = localStorage;
    if (token && !nextProps.userName) {
      this.props.getUserName();
    }
    return nextProps !== this.props;
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="wrapper">
        {loading && (
          <div className="page_spiner">
            <span className="icon-spinner2" />
          </div>
        )}
        <Router>
          <ScrollToTop>
            <div className={this.props.isBlur ? 'for-blur' : ''}>
              <Header />
              <Route path="/" component={MainPage} />
            </div>
            <Switch>
              <Route exact path="/schedule/movie/:movieId" component={BookingPage} />
              <Route path="/schedule/movie/:movieId/seance/:seanceId" component={SeatSelectionPage} />
              <Route exact path="/user/profile" component={UserProfilePage} />
            </Switch>
            <Switch>
              <Route path={['/login', '/schedule/movie/:movieId/seance/:seanceId/login']} component={LoginForm} />
              <Route
                path={['/registration', '/schedule/movie/:movieId/seance/:seanceId/registration']}
                component={RegistrationForm}
              />
            </Switch>
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}

const App = connect(
  mapStateToProps,
  { getUserName, resetUserName }
)(ConnectedApp);
export default App;
