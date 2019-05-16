import { Component } from "react";

class NavGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: ["Link1", "Link2", "Link3", "Link4", "Link5", "Link6"]
    };
  }

  render() {
    let links = this.state.links.map(link => {
      return <div>{link}</div>;
    });
    return <div className={this.props.className}>{links}</div>;
  }
}

export default NavGroup;
