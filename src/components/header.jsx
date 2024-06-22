// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#444" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: "#fff" }}>
          Accessibility Navigator
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/account">
              Account
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
