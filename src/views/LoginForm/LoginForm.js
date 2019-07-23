import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './login-form.scss';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import { logIn } from '../../webAPI';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    userName: state.userNameReducer.userName,
  };
};

class ConnectedLoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: null,
      disabledBtn: false,
      isUserNameEntered: true,
      isPasswordEntered: true,
      wrongMessage: '',
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
        wrongMessage: 'Please fill in the fields',
      });
    } else if (!userName) {
      this.setState({
        isUserNameEntered: false,
        wrongMessage: 'Please fill in the nickname',
      });
    } else if (!password) {
      this.setState({
        isPasswordEntered: false,
        wrongMessage: 'Please fill in the password',
      });
    } else {
      this.setState({
        loading: true,
        disabledBtn: true,
        isUserNameEntered: true,
        isPasswordEntered: true,
        wrongMessage: '',
      });

      const data = {
        nickName: userName,
        password,
      };
      logIn(data)
        .then(res => {
          if (res.message) {
            message.error(res.message, 5);
            this.setState({
              loading: false,
              disabledBtn: false,
              message: 'Failed',
            });
          } else {
            message.success('You are logged in', 5);
            this.setState({
              loading: false,
              disabledBtn: false,
              message: 'success',
            });
          }

          setTimeout(() => {
            const { message } = this.state;
            if (message === 'success') {
              this.onCloseButton();
            } else {
              this.setState({ message: null });
            }
          }, 1500);
        })
        .catch(err => console.log(err));
    }
  };

  onRegClick = () => {
    const path = this.props.history.location.pathname.replace('login', 'registration');
    this.props.history.replace(path);
  };

  onCloseButton = () => this.props.history.goBack();

  componentDidMount() {
    const { token } = localStorage;
    token && this.props.history.replace('/');
  }

  render() {
    return (
      <div className="login_form__wrapper">
        <div className="login_form">
          {this.state.message && <div className="result_message">{this.state.message}</div>}
          <div className="login_form__header">
            Authorization
            <span className="close_btn icon-cross" onClick={this.onCloseButton} />
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="form_group">
              <label htmlFor="user-name">Nickname:</label>
              <div className="input_group">
                <input
                  type="text"
                  name="userName"
                  id="user-name"
                  required
                  autoFocus
                  placeholder="nickname"
                  className={this.state.isUserNameEntered ? '' : 'wrong_input'}
                />
              </div>
            </div>
            <div className="form_group">
              <label htmlFor="user-password">Password:</label>
              <div className="input_group">
                <input
                  type="password"
                  name="userPassword"
                  id="user-pswd"
                  required
                  placeholder="password"
                  className={this.state.isPasswordEntered ? '' : 'wrong_input'}
                />
              </div>
            </div>
            <div className="form_group login_form_btn">
              <Button htmlType="submit" loading={this.state.loading} disabled={this.state.disabledBtn}>
                Log In
              </Button>
            </div>
            {this.state.wrongMessage && <span className="login_form__confirm_tip">{this.state.wrongMessage}</span>}
          </form>
          <span className="registration_link" onClick={this.onRegClick}>
            If you are haven`t account, SignUp
          </span>
        </div>
      </div>
    );
  }
}

const LoginForm = connect(mapStateToProps)(ConnectedLoginForm);

export default withRouter(LoginForm);
