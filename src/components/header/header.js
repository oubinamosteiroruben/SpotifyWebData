import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import MenuHeader from "../menuHeader/menuHeader";

function Header({title}) {
    return (
        <div className="header">
            <MenuHeader/>
            <h1 className="title">{title}</h1>
            <Link className="back-icon" to="/profile"><FontAwesomeIcon icon={faAngleLeft} /></Link>
        </div>
    );
}

export default Header