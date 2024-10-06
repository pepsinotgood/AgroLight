// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTachometerAlt, faBarsProgress, faCloudSunRain, faCircleQuestion, faGear } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
        <div className='navbar-box'>
      <div className="logo-container">
        <img src="/images/image14.png" alt="Logo" className="logo" />
      </div>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FontAwesomeIcon icon={faChartLine} className="nav-icon" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/environmental" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
            Environmental Status
          </NavLink>
        </li>
        <li>
          <NavLink to="/taskwork" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FontAwesomeIcon icon={faBarsProgress} className="nav-icon" />
            Task
          </NavLink>
        </li>
        <li>
          <NavLink to="/weather" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FontAwesomeIcon icon={faCloudSunRain} className="nav-icon" />
             Weather
          </NavLink>
        </li>

        <div className="support">
            <div className='support-title'>Support </div>
        </div>

        <li>
          <NavLink to="/Help" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FontAwesomeIcon icon={faCircleQuestion} className="nav-icon" />
            Help
          </NavLink>
        </li>
        <li>
          <NavLink to="/Setting" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FontAwesomeIcon icon={faGear} className="nav-icon" />
             Settings
          </NavLink>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default Navbar;
