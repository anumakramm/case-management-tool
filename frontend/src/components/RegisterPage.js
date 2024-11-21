import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions!");
      return;
    }
    // Placeholder for registration logic
    console.log({
      username,
      email,
      password,
    });
    navigate("/");
  };

  return (
    <div className="registration-container">
      <div className="illustration-container">
        <img
          src="rb_7853.png"
          alt="Registration Illustration"
          className="illustration-image"
        />
      </div>
      <div className="form-container">
        <h2 className="form-title">Adventure starts here 🚀</h2>
        <p className="form-subtitle">Make your case management easy and fun!</p>
        <form onSubmit={handleRegister} className="registration-form">
          {/* <div className="form-group">
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
          </div> */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-group terms-group">
            {/* <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            /> */}
            {/* <label htmlFor="terms" className="terms-label">
              I agree to <a href="/terms">privacy policy & terms</a>
            </label> */}
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
        <p className="form-footer">
          Already have an account? <a href="/">Sign in instead</a>
        </p>
        {/* <div className="divider"><span>or</span></div>
        <div className="social-login">
          <button className="social-button">🌐</button>
          <button className="social-button">🐦</button>
          <button className="social-button">🔴</button>
        </div>
        <button className="buy-now-button">Buy Now</button> */}
      </div>
    </div>
  );
};

export default RegistrationPage;
