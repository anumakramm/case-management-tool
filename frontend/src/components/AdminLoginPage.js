import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinAdmin } from "../api/admin"; // Correct the import to match the actual API function
import { setUserId } from "../redux/managerSlice";
import "./HomePage.css"; // Reuse the same styles as HomePage

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the correct API function for admin login
    signinAdmin({ username: username, password: password })
      .then((res) => {
        // Dispatch user ID to the Redux store
        dispatch(setUserId(res.data.user.id));
        localStorage.setItem("role", res.data.user.role);
        
        // Check if the user is an admin and navigate accordingly
        if (res.data.user.role === "admin") {
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        } else {
          alert("Access denied! Only admins can log in.");
        }
      })
      .catch((err) => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("role");
        alert("Invalid credentials or an error occurred.");
      });
  };

  return (
    <div className="homepage">
      <h2>Admin Login</h2>
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
    </div>
  );
};

export default AdminLoginPage;
