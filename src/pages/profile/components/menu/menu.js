import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

function Menu() {
    return (
        <div className="menu">
            <div className="menu-option"><Link to='/artists'>Artists</Link></div>
            <div className="menu-option"><Link to='/tracks'>Tracks</Link></div>
        </div>
    );
}

export default Menu;