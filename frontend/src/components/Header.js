import React from "react";
import "./Header.css"; // Make sure to create a Header.css file
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="nav-list">
          {/* <Link className="nav-item" to="/">Home</Link>
          <Link className="nav-item" to="/admin">Admin</Link>
          <Link className="nav-item" to="/case-manager">Case Manager Dashboard</Link>
          <Link className="nav-item" to="/product-manager">Product Manager Dashboard</Link> */}
          <li>
            <Button
              // type="text"
              variant="outlined"
              color="primary"
              onClick={() => {
                localStorage.removeItem("admin_token");
                localStorage.removeItem("role");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
