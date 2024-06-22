import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Box,
  Chip,
} from "@mui/material";

const PlaceCard = ({ place, onSelect }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        mb: 3,
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
          cursor: "pointer",
        },
      }}
      onClick={onSelect}
    >
      <ListItem alignItems="flex-start" disableGutters>
        <ListItemAvatar>
          <Avatar
            alt={place.name}
            src={place.image || "https://via.placeholder.com/150"}
            sx={{
              width: 80,
              height: 80,
              mr: 3,
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
                component="div"
                sx={{
                  color: "text.primary",
                  fontSize: "1.1rem",
                  mb: 1,
                }}
              >
                {place.address}
              </Typography>
              {place.description && (
                <Typography
                  variant="body2"
                  component="div"
                  sx={{
                    color: "text.secondary",
                    mb: 2,
                  }}
                >
                  {place.description.length > 100
                    ? `${place.description.substring(0, 100)}...`
                    : place.description}
                </Typography>
              )}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                <Chip label={`Phone: ${place.phone}`} size="small" />
                {place.website && (
                  <Chip
                    label="Website"
                    size="small"
                    component="a"
                    href={place.website}
                    target="_blank"
                    clickable
                  />
                )}
                {place.accessibility && (
                  <Chip
                    label={`Accessibility: ${place.accessibility}`}
                    size="small"
                  />
                )}
              </Box>
            </Box>
          }
        />
      </ListItem>
    </Paper>
  );
};

export default PlaceCard;
