import React from 'react';
import './navbar-styles.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-start">
        <ul className="menu menu-horizontal">
          <a className="btn-logo btn-ghost normal-case" style={{ fontSize: '50px' }}>IronPulse</a>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal">
          <li><a style={{ fontSize: '1.1rem' }}>Register</a></li>
          <li><a style={{ fontSize: '1.1rem' }}>About Us</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
