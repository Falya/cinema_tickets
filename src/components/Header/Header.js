import { Component } from "react";
import NavGroup from "./NavGroup/NavGroup";
import Searchfield from "./Searchfield/Searchfield";
import "./header.scss";

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
              <div>Sign In</div>
              <div>Sign Up</div>
            </div>
          </div>
        </div>
        <div className="bottom-header">
          <Searchfield className="search-field" />
        </div>
      </header>
    );
  }
}

export default Header;
