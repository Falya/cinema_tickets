import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NavGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: ['Ссылка1', 'Ссылка2', 'Ссылка3', 'Ссылка4', 'Ссылка5', 'Ссылка6']
        }
    }


    render() {
        let links = this.state.links.map(link => {
            return <div>{link}</div>
        })
        return (
            <div className={this.props.className}>
                {links}
            </div>
        );
    }
}

NavGroup.propTypes = {

};

export default NavGroup;
