// HomePage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { userSignIn } from "../api/productManager";
import { useDispatch } from "react-redux";
import { userId, setUserId } from "../redux/managerSlice";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    userSignIn({ username: username, password: password })
      .then((res) => {
        dispatch(setUserId(res.data.user.id));
        localStorage.setItem("role", res.data.user.role);
        if (res.data.user.role === "admin") {
          localStorage.setItem("admin_token", res.data.access_token);
          console.log("localstorage: ", localStorage.getItem("admin_token"))
          navigate("/admin");
        } else if (res.data.user.role === "product_manager") {
          navigate("/product-manager");
        } else if (res.data.user.role === "case_manager") {
          navigate("/case-manager");
        } else {
        }
      })
      .catch((err) => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("role");
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
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default HomePage;
