// src/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2024 Case Management Tool. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#282c34',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
    width: '100%',
    bottom: 0,
  },
};

export default Footer;
