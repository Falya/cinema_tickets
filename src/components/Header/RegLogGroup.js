import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetUserName } from '../../redux/actions/actions';

const mapStateToProps = state => {
  return {
    userName: state.userNameReducer.userName,
  };
};

class ConnectedRegLogGroup extends Component {
  constructor(props) {
    super(props);
  }

  onLogOutClick = () => {
    localStorage.removeItem('token');
    this.props.resetUserName();
  };

  render() {
    return this.props.userName ? (
      <div className="reg-log-group">
        <Link to="/profile" className="reg-log-link">
          <span className="icon-user"></span>
          {this.props.userName}
        </Link>
        <div className="reg-log-link" onClick={this.onLogOutClick}>
          LogOut
        </div>
      </div>
    ) : (
      <div className="reg-log-group">
        <Link to="/login" className="reg-log-link">
          Sign In
        </Link>
        <Link to="/registration" className="reg-log-link">
          Sign Up
        </Link>
      </div>
    );
  }
}

const RegLogGroup = connect(
  mapStateToProps,
  { resetUserName }
)(ConnectedRegLogGroup);

export default RegLogGroup;
