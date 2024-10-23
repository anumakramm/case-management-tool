// src/Header.js
import React from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}><a href="#">Home</a></li>
          <li style={styles.navItem}><a href="#">About Us</a></li>
          <li style={styles.navItem}><a href="#">Contact Us</a></li>
          <li style={styles.navItem}><a href="#">Cases</a></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  navList: {
    display: 'flex',
    justifyContent: 'space-around',
    listStyleType: 'none',
    padding: '10px',
    backgroundColor: '#282c34',
  },
  navItem: {
    color: '#61dafb',
  },
};

export default Header;
