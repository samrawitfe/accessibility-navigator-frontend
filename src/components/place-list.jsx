import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

const PlaceList = ({ places, label }) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {label}
      </Typography>
      <List>
        {places.map((place, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={place.name}
                src={place.image || "https://via.placeholder.com/150"}
              />
            </ListItemAvatar>
            <ListItemText
              primary={place.name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {place.address}
                  </Typography>
                  <br />
                  {place.description && (
                    <Typography>{place.description}</Typography>
                  )}
                  <br />
                  <Typography>Phone: {place.phone}</Typography>
                  {place.website && (
                    <Typography>
                      Website: <a href={place.website}>{place.website}</a>
                    </Typography>
                  )}
                  <br />
                  {place.accessibility && (
                    <Typography variant="body2" color="text.secondary">
                      Accessibility: {place.accessibility}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PlaceList;
