import React from 'react';
import './Header.css'; // Make sure to create a Header.css file

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item"><a href="#">Home</a></li>
          <li className="nav-item"><a href="#">About Us</a></li>
          <li className="nav-item"><a href="#">Contact Us</a></li>
          <li className="nav-item"><a href="#">Cases</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
