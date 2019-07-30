import { Component } from 'react';
import SearchField from './Searcfield/Searchfield';
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
          <div className="brand">
            <span className="first">Just</span>
            <span className="second">Watch</span>
          </div>
          <div className="menu-group">
            <RegLogGroup />
          </div>
          <SandwichButton onLogin={this.props.onLogin} onRegistration={this.props.onRegistration} />
          <SearchField className="search-field" />
        </div>
        <div className="bottom-header"></div>
      </header>
    );
  }
}

const Header = connect(mapStateToProps)(ConnectedHeader);

export default Header;
