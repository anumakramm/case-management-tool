// HomePage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { signinAdmin } from "../api/admin";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log({});
    signinAdmin({ username: username, password: password })
      .then((res) => {
        localStorage.setItem("admin_token", res.data.access_token);
        if (role === "admin") navigate("/admin");
        else if (role === "case_manager") navigate("/case-manager");
        else navigate("/product-manager");
      })
      .catch((err) => {
        localStorage.removeItem("admin_token");
      });
  };

  return (
    <div className="homepage">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Select Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="case_manager">Case Manager</option>
            <option value="product_manager">Product Manager</option>
          </select>
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default HomePage;
