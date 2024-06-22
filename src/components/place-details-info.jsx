// src/components/PlaceDetailsInfo.js
import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const DetailBox = ({ label, value }) => (
  <Box
    sx={{
      border: "1px solid #444",
      borderRadius: "8px",
      p: 2,
      mb: 2,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Typography variant="caption" sx={{ color: "secondary.main", mb: 1 }}>
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

const PlaceDetailsInfo = ({ placeDetails }) => {
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "secondary.main", mb: 3 }}
      >
        {placeDetails.name_en}
      </Typography>

      <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
          Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DetailBox label="Address" value={placeDetails.address} />
            <DetailBox label="Type" value={placeDetails.type} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailBox label="Phone" value={placeDetails.phone} />
            <DetailBox
              label="Accessibility"
              value={placeDetails.accessibility}
            />
          </Grid>
          {placeDetails.website && (
            <Grid item xs={12}>
              <DetailBox
                label="Website"
                value={
                  <a
                    href={placeDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#90CAF9" }}
                  >
                    {placeDetails.website}
                  </a>
                }
              />
            </Grid>
          )}
        </Grid>
      </Box>

      <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
          Description
        </Typography>
        <Typography variant="body1">{placeDetails.description}</Typography>
      </Box>
    </>
  );
};

export default PlaceDetailsInfo;
