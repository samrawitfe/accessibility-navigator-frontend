// src/components/ReviewList.js
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  ImageList,
  ImageListItem,
} from "@mui/material";

const isValidUserId = (id) => {
  // Add your logic to determine if the user ID is valid
  return id && id !== "undefined" && id !== "null";
};

const ReviewList = ({ reviews }) => {
  return (
    <Grid container spacing={3}>
      {reviews.map((review, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={2} sx={{ p: 3, bgcolor: "background.paper" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ mr: 2, bgcolor: "secondary.main" }}>
                {review.user && review.user.username
                  ? review.user.username[0].toUpperCase()
                  : "A"}
              </Avatar>
              <Typography variant="h6">
                {review.user && review.user.username ? (
                  review.user.id && isValidUserId(review.user.id) ? (
                    <Link
                      to={`/user/${review.user.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {review.user.username}
                    </Link>
                  ) : (
                    review.user.username
                  )
                ) : (
                  "Anonymous"
                )}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {review.text}
            </Typography>
            {review.imageUrl && review.imageUrl.length > 0 && (
              <ImageList
                sx={{ width: "100%", height: "auto" }}
                cols={3}
                rowHeight={164}
              >
                {review.imageUrl.map((img, imgIndex) => (
                  <ImageListItem key={imgIndex}>
                    <img
                      src={img}
                      alt={`Review image ${imgIndex + 1}`}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReviewList;
