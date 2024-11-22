import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { addPassword } from "../api/admin"; // Import the API function

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await addPassword({ email, password });
      if (response.status === 200) {
        alert("Password updated successfully!");
        navigate("/"); // Navigate to the login or home page
      } else {
        alert("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
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
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <p className="form-footer">
          Already have an account? <a href="/">Sign in instead</a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
