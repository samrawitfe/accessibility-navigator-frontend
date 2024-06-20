import React from "react";
import { Typography, Grid } from "@mui/material";
import PlaceCard from "./place-card";

const PlaceList = ({ places, label }) => {
  return (
    <div>
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        {label}:
      </Typography>
      <Grid container spacing={2}>
        {places.map((place, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <PlaceCard place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlaceList;
