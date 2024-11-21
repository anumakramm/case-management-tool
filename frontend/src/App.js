// App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AdminLoginPage from "./components/AdminLoginPage";
import CaseManagerDashboard from "./components/CaseManagerDashboard";

import HomePage from "./components/HomePage";
import ProductManagerDashboard from "./components/ProductManagerDashboard";
import RegistrationPage from "./components/RegisterPage";
import ProtectedRoute from "./components/protectedRoutes";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <main style={styles.mainContent}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* Protected Routes for Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="/admin-login" element={<AdminLoginPage />} />

          {/* Protected Routes for Case Manager */}
          <Route element={<ProtectedRoute allowedRoles={["case_manager"]} />}>
            <Route path="/case-manager" element={<CaseManagerDashboard />} />
          </Route>

          {/* Protected Routes for Product Manager */}
          <Route
            element={<ProtectedRoute allowedRoles={["product_manager"]} />}
          >
            <Route
              path="/product-manager"
              element={<ProductManagerDashboard />}
            />
          </Route>
        </Routes>
      </main>
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
