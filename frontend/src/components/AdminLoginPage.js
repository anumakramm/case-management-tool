import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinAdmin } from "../api/admin";
import { setUserId } from "../redux/managerSlice";
import "./AdminLoginPage.css";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    signinAdmin({ username, password })
      .then((res) => {
        localStorage.setItem("admin_token", res.data.access_token);
        localStorage.setItem("role", "admin");

        navigate("/admin");
      })
      .catch((err) => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("role");
        alert("Invalid credentials or an error occurred.");
      });
  };

  return (
    <div className="admin-login-container">
      <div className="illustration-container">
        <img
          src="rb_2148392549.png"
          alt="Admin Login Illustration"
          className="illustration-image"
        />
      </div>
      <div className="form-container">
        <h2 className="form-title">Admin Login 🚀</h2>
        <p className="form-subtitle">Access your admin dashboard securely.</p>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
