// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductManagerDashboard from "./components/ProductManagerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import CaseManagerDashboard from "./components/CaseManagerDashboard";
import HomePage from "./components/HomePage";
import RegistrationPage from "./components/RegisterPage";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Header />
      {/* <Navbar /> */}
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/case-manager" element={<CaseManagerDashboard />} />
          <Route
            path="/product-manager"
            element={<ProductManagerDashboard />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#f4f4f4",
    padding: "10px 20px",
    borderBottom: "1px solid #ddd",
  },
  navList: {
    display: "flex",
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginRight: "15px",
  },
  mainContent: {
    minHeight: "80vh",
    padding: "20px",
  },
};

export default App;
