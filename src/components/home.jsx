// src/components/Home.js
import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to the Accessibility Navigator
      </Typography>
      <Typography variant="body1">
        Navigate Brno with ease and accessibility. Discover accessible routes,
        facilities, and services tailored to your needs.
      </Typography>
    </Container>
  );
};

export default Home;
