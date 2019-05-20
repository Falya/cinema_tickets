import { Component } from 'react';
import './registartion-form.scss';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPostedData: false,
      isPasswordConfirmed: true
    };
  }
  /**
   * @param {Event} e
   */
  onSubmit = e => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let isAllInputsFilled = false;

    for (let input of formData.entries()) {
      input[1] ? (isAllInputsFilled = true) : (isAllInputsFilled = false);
    }

    const password = formData.get('password'),
      confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      this.setState({ isPasswordConfirmed: false });
    } else {
      !this.state.isPasswordConfirmed && this.setState({ isPasswordConfirmed: true });
    }

    if (isAllInputsFilled && this.state.isPasswordConfirmed) {
      fetch('/dbImitation/films.json', {
        method: 'POST',
        body: formData
      })
        .then(res => this.setState({ isPostedData: true }))
        .catch(err => console.log(err));
    }
  };

  render() {
    let { isPasswordConfirmed } = this.state;
    return (
      <div className="registration-form">
        <div className="registration-form-header">Registration</div>
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
          {!isPasswordConfirmed && <span className="registration-form-confirm-tip">Please confirm your password</span>}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
