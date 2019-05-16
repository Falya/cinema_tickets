import { Component } from "react";
import "./reg-form.scss";

class RegForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {}
    };
  }
/**
 * @prop e {string}
 */
  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="reg-form">
      <div className="reg-form-header">Registration</div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="user-name">Username:</label>
            <input
              type="text"
              placeholder="Desired username"
              name="user-name"
              id="user-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder='example@example.com'/>
          </div>
          <div className="form-group">
            <label htmlFor="pswd">Password:</label>
            <input type="password" name="pswd" id="pswd" placeholder='password'/>
          </div>
          <div className="form-group">
          <label htmlFor="repeat-pswd">Repeat password:</label>
            <input type="password" name="repeat-pswd" id="repeat-paswd" placeholder='password'/>
          </div>
            <div className="form-group reg-form-btn">
              <button>Registration</button>
            </div>
        </form>
      </div>
    );
  }
}

export default RegForm;
