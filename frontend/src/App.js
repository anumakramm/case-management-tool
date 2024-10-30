// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductManagerDashboard from './components/ProductManagerDashboard';
import AdminDashboard from './components/AdminDashboard'; // Import the Admin Dashboard
import CaseManagerDashboard from './components/CaseManagerDashboard'; // Import the Case Manager Dashboard

function App() {
  return (
    <Router>
      <Header />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
          <li>
            <Link to="/case-manager">Case Manager Dashboard</Link>
          </li>
          <li>
            <Link to="/product-manager">Product Manager Dashboard</Link>
          </li>
        </ul>
      </nav>
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<h1>Welcome to the Dashboard</h1>} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/case-manager" element={<CaseManagerDashboard />} />
          <Route path="/product-manager" element={<ProductManagerDashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

const styles = {
  mainContent: {
    minHeight: '80vh',
    padding: '20px',
  },
};

export default App;
