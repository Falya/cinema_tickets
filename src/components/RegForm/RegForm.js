import { Component } from 'react';
import './reg-form.scss';

class RegForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPostedData: false,
      isPswdConfirmed: true
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

    const pswd = formData.get('pswd'),
      confirmPswd = formData.get('confirmPswd');

    if (pswd !== confirmPswd) {
      this.setState({ isPswdConfirmed: false });
    } else {
      !this.state.isPswdConfirmed && this.setState({ isPswdConfirmed: true });
    }

    if (isAllInputsFilled && this.state.isPswdConfirmed) {
      fetch('/dbImitation/films.json', {
        method: 'POST',
        body: formData
      })
        .then(res => this.setState({ isPostedData: true }))
        .catch(err => console.log(err));
    }
  };

  render() {
    let { isPswdConfirmed } = this.state;
    return (
      <div className="reg-form">
        <div className="reg-form-header">Registration</div>
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
            <label htmlFor="pswd">Password:</label>
            <div className="input-group">
              <input type="password" name="pswd" id="pswd" placeholder="password" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirm-pswd">Confirm password:</label>
            <div className="input-group">
              <input
                type="password"
                name="confirmPswd"
                id="confirm-pswd"
                className={isPswdConfirmed ? '' : 'wrong-input'}
                placeholder="confirm password"
                required
              />
            </div>
          </div>
          <div className="form-group reg-form-btn">
            <button type="submit">Registration</button>
          </div>
          {!isPswdConfirmed && <span className="reg-form-confirm-tip">Please confirm your password</span>}
        </form>
      </div>
    );
  }
}

export default RegForm;
