import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/admin" style={styles.navLink}>Admin Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/case-manager" style={styles.navLink}>Case Manager Dashboard</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/product-manager" style={styles.navLink}>Product Manager Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '15px 30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
  },
  navItem: {
    marginRight: '20px',
    position: 'relative',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 12px',
    transition: 'all 0.3s ease',
  },
  // Add hover and active styles
  navItemHover: {
    color: '#f4f4f4',
    borderBottom: '3px solid #4CAF50',
  },
  navLinkHover: {
    color: '#4CAF50',
  },
};

// Add event listener functions for hover effect (optional, if using inline JS)
// You could use CSS classes instead for ease

export default Navbar;
