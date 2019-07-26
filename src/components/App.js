import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header/Header';
import LoginForm from '../views/LoginForm/LoginForm';
import RegistrationForm from '../views/RegistrationForm/RegistrationForm';
import MainPage from '../views/MainPage';
import BookingPage from '../views/BookingPage';
import SeatSelectionPage from './SeatSelectionPage/SeatSelectionPage';
import { getUserName } from '../redux/actions/actions';
import UserProfilePage from '../views/UserProfilePage/UserProfilePage';

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
  }

  shouldComponentUpdate(nextProps) {
    const { token } = localStorage;
    if (token && !nextProps.userName) {
      this.props.getUserName();
    }
    return nextProps !== this.props;
  }

  render() {
    const log = /^[a-z0-9/]*\/login$/gi;
    const reg = /^[a-z0-9/]*\/registration$/gi;
    const { loading } = this.props;
    return (
      <div className="wrapper">
        {loading && (
          <div className="page_spiner">
            <span className="icon-spinner2" />
          </div>
        )}
        <Router>
          <div className={this.props.isBlur ? 'for-blur' : ''}>
            <Header />
            <Route path="/" component={MainPage} />
          </div>
          <Switch>
            <Route exact path="/schedule/movie/:movieId" component={BookingPage} />
            <Route path="/schedule/movie/:movieId/seance/:seanceId" component={SeatSelectionPage} />
            <Route exact path="/user/profile" component={UserProfilePage} />
          </Switch>
          <Route path={log} component={LoginForm} />
          <Route path={reg} component={RegistrationForm} />
        </Router>
      </div>
    );
  }
}

const App = connect(
  mapStateToProps,
  { getUserName }
)(ConnectedApp);
export default App;
