// HomePage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { signinAdmin } from "../api/admin";
import { signinCaseManager } from "../api/caseManager";
import { signinProjectManager } from "../api/productManager";
import { useDispatch } from "react-redux";
import { setCaseManagerId, setProductManagerId } from "../redux/managerSlice";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "admin") {
      signinAdmin({ username: username, password: password })
        .then((res) => {
          localStorage.setItem("role", role);

          localStorage.setItem("admin_token", res.data.access_token);
          navigate("/admin");
        })
        .catch((err) => {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("role");
        });
    } else if (role === "case_manager") {
      signinCaseManager({ username: username, password: password })
        .then((res) => {
          dispatch(setCaseManagerId(res.data.id));
          localStorage.setItem("role", role);
          navigate("/case-manager");
        })
        .catch((err) => {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("role");
        });
    } else {
      signinProjectManager({ username: username, password: password })
        .then((res) => {
          dispatch(setProductManagerId(res.data.id));
          localStorage.setItem("role", role);
          navigate("/product-manager");
        })
        .catch((err) => {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("role");
        });
    }
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
