import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = {};
    render() {
        return (
            <nav className="indigo darken-2">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">
                        Bullet Journal
                    </Link>
                    <ul
                        id="nav-mobile"
                        // className="right hide-on-small-and-down"
                        className="right"
                    >
                        <li>
                            <Link to="/calendar">Calendar</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
