import React, { Component } from 'react';
import NavGroup from './NavGroup/NavGroup';

require('./header.scss')

class Header extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <header>
                <div className="top-header">
                    <div className='brand'>Бренд</div>
                    <div className='menu-group'>
                        <NavGroup className='nav-group'/>
                        <div className='reg-log-group'>
                            <div>Sign In</div>
                            <div>Sign Up</div>
                        </div>

                    </div>
                </div>
                <div className="bottom-header">
                    <div className="searchfield">
                    <label htmlFor="searchfield">Поиск</label>
                        <input type="text" id='searchfield'/>
                        <button>Search</button>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {

};

export default Header;
