import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Navbar Component
 * Displays brand logo and links to Home ('/') and Characters ('/characters').
 * Uses NavLink from react-router-dom to highlight the currently active route.
 */
function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-logo" id="nav-brand">
          <span className="portal-icon" aria-hidden="true"></span>
          <span>Rick & Morty Explorer</span>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="navbar-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                id="nav-link-home"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/characters" 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                id="nav-link-characters"
              >
                Characters
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
