import React, { useState } from 'react';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faBell, 
  faUser,
  faSignOutAlt,
  faChevronDown,
  faChevronUp 
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar className="header">
      <Container fluid>
        <div className="header-left">
          <div className="header-titles">
            <h1>Welcome Back, Admin</h1>
            <p>Here is the information about all your orders</p>
          </div>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button className="icon-button">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <Dropdown 
            align="end"
            show={isDropdownOpen}
            onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
          >
            <Dropdown.Toggle className="user-dropdown">
              <FontAwesomeIcon icon={faUser} className="avatar" />
              <span>Admin</span>
              <FontAwesomeIcon 
                icon={isDropdownOpen ? faChevronUp : faChevronDown} 
                className="dropdown-arrow"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header; 