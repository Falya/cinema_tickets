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
      isUserNameEntried: true,
      isPswdEntried: true,
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
      password = formData.get('userPswd');

    if (!userName && !password) {
      this.setState({
        isUserNameEntried: false,
        isPswdEntried: false,
        wrongMessage: 'Please fill in the fields'
      });
    } else if (!userName) {
      this.setState({
        isUserNameEntried: false,
        wrongMessage: 'Please fill in the nickname'
      });
    } else if (!password) {
      this.setState({
        isPswdEntried: false,
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
        isUserNameEntried: true,
        isPswdEntried: true,
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
                className={this.state.isUserNameEntried ? '' : 'wrong-input'}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="user-pswd">Password:</label>
            <div className="input-group">
              <input
                type="password"
                name="userPswd"
                id="user-pswd"
                required
                placeholder="password"
                className={this.state.isPswdEntried ? '' : 'wrong-input'}
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
