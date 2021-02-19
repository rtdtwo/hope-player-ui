import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo.svg'

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <img src={logo} className="m-1" alt="" />
                <Dropdown className="menu-mobile">
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Menu</Dropdown.Toggle>
                    <Dropdown.Menu className="bg-dark">
                        <Dropdown.Item className="bg-dark text-light" onClick={() => this.props.changeScreen(0)}>Library</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item className="bg-dark text-light" onClick={() => this.props.changeScreen(2)}>About</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>

        )
    }
}

export default Navbar;