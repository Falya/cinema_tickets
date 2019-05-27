import React, { Component } from 'react';
import './login-form.scss';
import { Button } from 'antd';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      iconLoading: false,
      disabledBtn: false,
      isPostedData: false,
      isUserNameEntered: true,
      isPasswordEntered: true,
      wrongMessage: ''
    };
  }

  /**
   * @param {Event} e;
   */
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userName = formData.get('userName'),
      password = formData.get('userPassword');

    if (!userName && !password) {
      this.setState({
        isUserNameEntered: false,
        isPasswordEntered: false,
        wrongMessage: 'Please fill in the fields'
      });
    } else if (!userName) {
      this.setState({
        isUserNameEntered: false,
        wrongMessage: 'Please fill in the nickname'
      });
    } else if (!password) {
      this.setState({
        isPasswordEntered: false,
        wrongMessage: 'Please fill in the password'
      });
    } else {
      fetch('/dbImitation/films.json', {
        method: 'POST',
        body: formData
      })
        .then(() => this.setState({
          isPostedData: true,
          iconLoading: false,
          loading: false,
          disabledBtn: false
        }))
        .catch(err => console.log(err));

      this.setState({
        iconLoading: true,
        loading: true,
        disabledBtn: true,
        isUserNameEntered: true,
        isPasswordEntered: true,
        wrongMessage: ''
      });
    }
  };

  render() {
    return (
      <div className="login-form">
        <div className="login-form-header">Authorization</div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="user-name">Nickname:</label>
            <div className="input-group">
              <input
                type="text"
                name="userName"
                id="user-name"
                required
                placeholder="nickname"
                className={this.state.isUserNameEntered ? '' : 'wrong-input'}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="user-password">Password:</label>
            <div className="input-group">
              <input
                type="password"
                name="userPassword"
                id="user-pswd"
                required
                placeholder="password"
                className={this.state.isPasswordEntered ? '' : 'wrong-input'}
              />
            </div>
          </div>
          <div className="form-group login-form-btn">
            <Button htmlType='submit' loading={this.state.loading} disabled={this.state.disabledBtn}>
          Log In
        </Button>
          </div>
          {this.state.wrongMessage && <span className="login-form-confirm-tip">{this.state.wrongMessage}</span>}
        </form>
      </div>
    );
  }
}
