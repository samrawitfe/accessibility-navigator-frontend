import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
  Box,
} from "@mui/material";
import { FaWheelchair, FaBlind, FaDeaf } from "react-icons/fa";

const PlaceCard = ({ place }) => {
  return (
    <Card
      style={{
        display: "flex",
        marginBottom: "16px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <CardMedia
        component="img"
        style={{ width: 151 }}
        image={place.image || "default-image-url"}
        alt={place.name}
      />
      <Box style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography component="div" variant="h5">
            {place.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="div">
            {place.address}
          </Typography>
          <Box style={{ marginTop: "8px" }}>
            {place.accessibilityFeatures.includes("ramps") && (
              <Chip
                icon={<FaWheelchair />}
                label="Ramps"
                style={{
                  marginRight: "4px",
                  backgroundColor: "#555",
                  color: "#fff",
                }}
              />
            )}
            {place.accessibilityFeatures.includes("wc") && (
              <Chip
                icon={<FaBlind />}
                label="Accessible WC"
                style={{
                  marginRight: "4px",
                  backgroundColor: "#555",
                  color: "#fff",
                }}
              />
            )}
            {place.accessibilityFeatures.includes("hearing") && (
              <Chip
                icon={<FaDeaf />}
                label="Hearing Aid"
                style={{
                  marginRight: "4px",
                  backgroundColor: "#555",
                  color: "#fff",
                }}
              />
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PlaceCard;
