// src/react-app/components/Navbar.tsx
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const resources = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">Star Wars API</NavLink>
      <div className="navbar-links">
        {resources.map((resource) => (
          <NavLink key={resource} to={`/${resource}`} className="nav-link">
            {resource.charAt(0).toUpperCase() + resource.slice(1)}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
