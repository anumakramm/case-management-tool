import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import { userSignIn } from "../api/productManager";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/managerSlice";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    userSignIn({ username, password })
      .then((res) => {
        dispatch(setUserId(res.data.user.id));
        localStorage.setItem("role", res.data.user.role);
        if (res.data.user.role === "admin") {
          navigate("/admin");
        } else if (res.data.user.role === "product_manager") {
          navigate("/product-manager");
        } else if (res.data.user.role === "case_manager") {
          navigate("/case-manager");
        }
      })
      .catch((err) => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("role");
      });
  };

  return (
    <div className="homepage-container">
      <div className="illustration-container">
        <img
          src="rb_3180.png"
          alt="Welcome Illustration"
          className="illustration-image"
        />
      </div>
      <div className="form-container">
        <h2 className="welcome-title">Welcome to CaseSync! 👋</h2>
        <p className="welcome-subtitle">
          Please sign in to your account and start the adventure.
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-options">
            {/* <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className="remember-label">
                Remember Me
              </label>
            </div> */}
            {/* <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link> */}
          </div>
          <button type="submit" className="submit-button">
            SIGN IN
          </button>
        </form>
        <p className="register-prompt">
          New on our platform? <Link to="/register">Create an account</Link>
        </p>
        {/* <div className="divider">
          <span>or</span>
        </div> */}
        {/* <div className="social-login">
          <button className="social-button">🌐</button>
          <button className="social-button">🐦</button>
          <button className="social-button">🔴</button>
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
