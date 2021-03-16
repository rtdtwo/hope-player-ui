import React from 'react';
import logo from '../assets/logo-light.svg';
import { PAGES } from '../utils/MenuProvider'

const Sidebar = (props) => {
    const menu = PAGES.map(page => {
        const isActive = props.currentPage === page;
        return <div key={page.index} className={isActive ? "menu-item menu-item-active" : "menu-item"} onClick={() => props.setCurrentPage(page)}>
            <img alt="" className="menu-icon" src={isActive ? page.iconActive : page.icon} />
            <p className="menu-label">{page.label}</p>
        </div>
    })

    return (
        <div>
            <img src={logo} className="logo mb-2" alt="" />
            {menu}
        </div>
    );
}

export default Sidebar;