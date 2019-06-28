import React, { Component } from 'react';
import './sandwich-button.scss';
import NavGroup from '../NavGroup/NavGroup';
import RegLogGroup from '../RegLogGroup';
class SandwichButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  onLoginClick = () => {
    this.props.onLogin();
  };

  /**
   * @param {Event} e
   */
  onMenuClick = e => {
    if (e.target !== e.currentTarget && !e.target.classList.contains('nav-group')) {
      let { isChecked } = !this.state;
      this.setState({ isChecked });
    }
  };

  onCheckBoxChange = e => {
    let isChecked = e.target.checked;
    this.setState({ isChecked });
  };

  render() {
    return (
      <div className="menuToggle">
        <input type="checkbox" onChange={this.onCheckBoxChange} checked={this.state.isChecked} />
        <span className="sandwich-span" />
        <span className="sandwich-span" />
        <span className="sandwich-span" />
        <div className="menu" onClick={this.onMenuClick}>
          <RegLogGroup />
          <NavGroup className="nav-group" />
        </div>
      </div>
    );
  }
}

export default SandwichButton;
