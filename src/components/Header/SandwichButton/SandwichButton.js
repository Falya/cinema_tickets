import React, { Component } from 'react';
import './sandwich-button.scss';
import NavGroup from '../NavGroup/NavGroup';
class SandwichButton extends Component {
  constructor(props) {
    super(props);
    open;
  }

  render() {
    return (
        <div className="menuToggle">
          <input type="checkbox" />
          <span />
          <span />
          <span />
          <div className="menu">
            <NavGroup className='nav-group'/>
          </div>
        </div>
    );
  }
}

export default SandwichButton;
