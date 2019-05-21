import React, { Component } from 'react';
import './sandwich-button.scss';
import NavGroup from '../NavGroup/NavGroup';
class SandwichButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  onLoginClick = () => {
    this.props.onLogin();
  }
/**
 * @param {Event} e
 */
  onMenuClick = e => {
    if(e.target !== e.currentTarget && !e.target.classList.contains('nav-group')) {
      let { isChecked } = !this.state;
      this.setState({isChecked});
    }
  }

  onCheckBoxChange = (e) => {
    let isChecked = e.target.checked;
    this.setState({isChecked});
  }

  render() {
    return (
        <div className="menuToggle">
          <input type="checkbox" onChange={this.onCheckBoxChange} checked={this.state.isChecked}/>
          <span />
          <span />
          <span />
          <div className="menu" onClick={this.onMenuClick}>
          <div className="reg-log-group">
              <div onClick={this.onLoginClick}>Sign In</div>
              <div onClick={this.props.onRegistration}>Sign Up</div>
            </div>
            <NavGroup className='nav-group'/>
          </div>
        </div>
    );
  }
}

export default SandwichButton;
