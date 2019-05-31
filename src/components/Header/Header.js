import { Component } from 'react';
import NavGroup from './NavGroup/NavGroup';
import SearchField from './SearchField/SearchField';
import './header.scss';
import SandwichButton from './SandwichButton/SandwichButton';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className="top-header">
          <div className="brand">Brand</div>
          <div className="menu-group">
            <NavGroup className="nav-group" />
            <div className="reg-log-group">
              <div onClick={this.props.onLogin}>Sign In</div>
              <div>Sign Up</div>
            </div>
          </div>
          <SandwichButton onLogin={this.props.onLogin} onRegistration={this.props.onRegistration} />
        </div>
        <div className="bottom-header">
          <SearchField className="search-field" />
        </div>
      </header>
    );
  }
}

export default Header;
