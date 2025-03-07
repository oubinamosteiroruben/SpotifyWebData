import React from "react";
import { Link, useLocation } from "react-router-dom";
import './menuHeader.css';

function MenuHeader() {
    const location = useLocation();

    return (
        <div className="menu-header">
            <div className={`menu-header-option ${location.pathname === '/artists' ? 'selected' : ''}`}>
                <Link to='/artists'>Artists</Link>
            </div>
            <div className={`menu-header-option ${location.pathname === '/tracks' ? 'selected' : ''}`}>
                <Link to='/tracks'>Tracks</Link>
            </div>
        </div>
    );
}

export default MenuHeader;