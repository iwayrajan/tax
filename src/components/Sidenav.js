import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';
import './Sidenav.css';

function Sidenav() {
  const location = useLocation();

  return (
    <div className="sidenav">
      <div className="logo-container">
        <Link to="/dashboard">
          <img src="/Logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <Nav className="flex-column">
        <Nav.Link 
          as={Link} 
          to="/dashboard" 
          active={location.pathname === '/dashboard'}
          className="nav-item"
        >
          <FontAwesomeIcon icon={faHome} className="nav-icon" />
          <span>Dashboard</span>
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/aboutus" 
          active={location.pathname === '/aboutus'}
          className="nav-item"
        >
          <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" />
          <span>About Us</span>
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidenav; 