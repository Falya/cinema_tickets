import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './registration-form.scss';
import { signUp } from '../../webAPI';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPostedData: false,
      isPasswordConfirmed: true,
      message: null,
    };
  }

  /**
   * @param {Event} e
   */
  onSubmit = e => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let areAllInputsFilled = [...formData.values()].every(value => !!value);
    const password = formData.get('password'),
      confirmPassword = formData.get('confirmPassword'),
      isPasswordConfirmed = password === confirmPassword;

    if (this.state.isPasswordConfirmed !== confirmPassword) {
      this.setState({ isPasswordConfirmed });

      if (areAllInputsFilled && this.state.isPasswordConfirmed) {
        const data = {
          nickName: formData.get('userName'),
          email: formData.get('email'),
          password: formData.get('password'),
        };
        signUp(data).then(res => {
          if (res.message) {
            this.setState({ message: res.message });
          } else {
            this.setState({ message: 'success' });
          }
          setTimeout(() => {
            const { message } = this.state;
            this.setState({ message: null });
            if (message === 'success') {
              this.onCloseButton();
            }
          }, 2000);
        });
      }
    }
  };

  onCloseButton = () => this.props.history.goBack();

  render() {
    let { isPasswordConfirmed } = this.state;
    return (
      <div className="registration-form__wrapper">
        <div className="registration-form">
          {this.state.message && <div className="result-message">{this.state.message}</div>}
          <div className="registration-form-header">
            Registration
            <span className="close-btn icon-cross" onClick={this.onCloseButton} />
          </div>
          <form onSubmit={this.onSubmit} autoComplete="on">
            <div className="form-group">
              <label htmlFor="user-name">Username:</label>
              <div className="input-group">
                <input type="text" placeholder="Desired username" name="userName" id="user-name" autoFocus required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <div className="input-group">
                <input type="email" name="email" id="email" placeholder="example@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="input-group">
                <input type="password" name="password" id="password" placeholder="password" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm password:</label>
              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  className={isPasswordConfirmed ? '' : 'wrong-input'}
                  placeholder="confirm password"
                  required
                />
              </div>
            </div>
            <div className="form-group registration-form-btn">
              <button type="submit">Registration</button>
            </div>
            {!isPasswordConfirmed && (
              <span className="registration-form-confirm-tip">Please confirm your password</span>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(RegistrationForm);