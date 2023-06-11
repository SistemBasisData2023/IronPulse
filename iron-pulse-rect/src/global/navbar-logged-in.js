import React from "react";
import "./navbar-styles.css";
import { Link, useNavigate } from "react-router-dom";

function NavbarLoggedin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the session or perform any necessary logout logic here
    localStorage.clear();

    // Redirect the user to the home page after logout
    navigate("/login");
  };

  const handleLogLocalStorage = () => {
    console.log(localStorage);
  };

  return (
    <div className="navbar">
      <div className="navbar-start">
        <ul className="menu menu-horizontal">
          <a
            className="btn-logo btn-ghost normal-case"
            style={{ fontSize: "50px" }}
            href="/home"
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
          <li>
            <Link to="/admin" style={{ fontSize: "1.1rem" }}>
              TEST ADMIN
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} style={{ fontSize: "1.1rem" }}>
              Logout
            </button>
          </li>
          {/* <li>
            <button onClick={handleLogLocalStorage} style={{ fontSize: "1.1rem" }}>
              Log Local Storage
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default NavbarLoggedin;
