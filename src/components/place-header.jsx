import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlaceHeader = ({ placeName, placeId, coordinates }) => {
  const navigate = useNavigate();

  const handleStartNavigation = () => {
    navigate(`/navigate/${placeId}`, {
      state: { destination: coordinates },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "primary.main", fontWeight: "bold" }}
      >
        {placeName}
      </Typography>
      <Box>
        <Button
          variant="contained"
          onClick={handleStartNavigation}
          sx={{ mr: 2 }}
        >
          Start Navigation
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back to List
        </Button>
      </Box>
    </Box>
  );
};

export default PlaceHeader;
