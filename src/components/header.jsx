// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#444" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: "#fff" }}>
          Accessibility Navigator
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>

        <Button color="inherit" component={Link} to="/account">
          Account
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
