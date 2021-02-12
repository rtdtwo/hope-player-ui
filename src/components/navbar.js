import React, { Component } from 'react';
import logo from '../assets/logo.svg'

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <img src={logo} className="logo m-1" alt="" />
            </div>
        )
    }
}

export default Navbar;