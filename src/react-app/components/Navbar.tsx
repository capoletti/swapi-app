// src/react-app/components/Navbar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const resources = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">Star Wars API</NavLink>
      <div className="menu-icon" onClick={toggleMobileMenu}>
        <div className={isMobileMenuOpen ? 'bar open' : 'bar'}></div>
        <div className={isMobileMenuOpen ? 'bar open' : 'bar'}></div>
        <div className={isMobileMenuOpen ? 'bar open' : 'bar'}></div>
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
        {resources.map((resource) => (
          <NavLink key={resource} to={`/${resource}`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            {resource.charAt(0).toUpperCase() + resource.slice(1)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
