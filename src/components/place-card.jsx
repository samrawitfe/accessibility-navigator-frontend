// place-card.jsx
import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const PlaceCard = ({ place }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        mb: 2,
        "&:hover": {
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
        },
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={place.name}
            src={place.image || "https://via.placeholder.com/150"}
            sx={{
              width: 56,
              height: 56,
              mr: 2,
            }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                fontSize: "1.8rem",
                mb: 1,
              }}
            >
              {place.name}
            </Typography>
          }
          secondary={
            <Box component="div">
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                  mb: 1,
                }}
              >
                {place.address}
              </Typography>
              {place.description && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    mb: 1,
                  }}
                >
                  {place.description}
                </Typography>
              )}
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  fontSize: "1.2rem",
                  mt: 1,
                }}
              >
                Phone: {place.phone}
              </Typography>
              {place.website && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.1rem",
                    mt: 1,
                  }}
                >
                  Website:{" "}
                  <a
                    href={place.website}
                    style={{ color: "#BB86FC", textDecoration: "none" }}
                  >
                    {place.website}
                  </a>
                </Typography>
              )}
              {place.accessibility && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "1.1rem",
                    mt: 1,
                    lineHeight: 1.4,
                  }}
                >
                  Accessibility: {place.accessibility}
                </Typography>
              )}
            </Box>
          }
        />
      </ListItem>
    </Paper>
  );
};

export default PlaceCard;
