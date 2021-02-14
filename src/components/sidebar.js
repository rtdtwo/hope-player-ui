import React, { Component } from 'react';
import Controller from './controller'
import logo from '../assets/logo.svg'

const menuItems = ["Library", "Artists", "Add Song", "About"];
const menuIndexesToShowInactive = [2, 3]

class Sidebar extends Component {
    state = {
        menu: []
    }

    componentDidMount() {
        this.changeMenu(0);
    }

    changeMenu = (selectedMenuItem) => {
        if (!menuIndexesToShowInactive.includes(selectedMenuItem)) {
            this.setState({
                selectedMenuItem: selectedMenuItem,
                menu: this.generateMenu(selectedMenuItem)
            })
        }
    }

    generateMenu = (selectedMenuItem) => {
        return menuItems.map((item) => {
            const index = menuItems.indexOf(item)
            let className = "ml-3 mr-3 mt-4 mb-4";
            if (index === selectedMenuItem) {
                className += " menu-active";
            } else {
                className += " menu-inactive";
            }

            return (
                <p
                    className={className}
                    key={item}
                    onClick={() => {
                        this.changeMenu(index)
                        this.props.changeScreen(index,)
                    }}>
                    {item}
                </p>
            );
        })
    }


    render() {
        return (
            <div className="sidebar">
                <img src={logo} className="logo ml-3 mt-3 mr-3" alt="" />

                {this.state.menu}

                <div className="align_bottom">
                    <Controller />
                </div>
            </div>
        )
    }
}

export default Sidebar;