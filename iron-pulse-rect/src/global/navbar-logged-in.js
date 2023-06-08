import React from "react";
import "./navbar-styles.css";
import { Link } from "react-router-dom";

function NavbarLoggedin() {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <ul className="menu menu-horizontal">
          <a
            className="btn-logo btn-ghost normal-case"
            style={{ fontSize: "50px" }}
          >
            IronPulse
          </a>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal">
          <li>
            <Link to="/bookings" style={{ fontSize: "1.1rem" }}>
              Bookings
            </Link>
          </li>
          <li>
            <Link to="/personal-trainers" style={{ fontSize: "1.1rem" }}>
              Personal Trainers
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarLoggedin;
