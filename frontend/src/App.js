// src/App.js
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductManagerDashboard from './components/ProductManagerDashboard';

function App() {
  return (
    <div>
      <Header />
      <main style={styles.mainContent}>
        <ProductManagerDashboard />
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  mainContent: {
    minHeight: '80vh',
    padding: '20px',
  },
};

export default App;
