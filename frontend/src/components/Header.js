import React from 'react';
import './Header.css'; // Make sure to create a Header.css file
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="nav-list">
          <Link className="nav-item" to="/">Home</Link>
          <Link className="nav-item" to="/admin">Admin</Link>
          <Link className="nav-item" to="/case-manager">Case Manager Dashboard</Link>
          <Link className="nav-item" to="/product-manager">Product Manager Dashboard</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
