import { Component } from 'react';
import NavGroup from './NavGroup/NavGroup';
import SearchField from './SearchField/SearchField';
import './header.scss';
import SandwichButton from './SandwichButton/SandwichButton';
import { connect } from 'react-redux';
import RegLogGroup from './RegLogGroup';

const mapStateToProps = state => {
  return {
    userName: state.userNameReducer.userName,
  };
};

class ConnectedHeader extends Component {
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
            <RegLogGroup />
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

const Header = connect(mapStateToProps)(ConnectedHeader);

export default Header;
