import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const AddReview = ({ onAddReview }) => {
  const [reviewText, setReviewText] = useState("");
  const [image, setImage] = useState(null);

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = () => {
    onAddReview({
      user: "Current User", // This should be replaced with actual user data
      comment: reviewText,
      images: image ? [image] : [],
    });
    setReviewText("");
    setImage(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Your Review
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={handleReviewChange}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Typography variant="body2" sx={{ ml: 2 }}>
          {image ? "Image selected" : "Upload an image (optional)"}
        </Typography>
      </Box>
      {image && (
        <Box sx={{ mb: 2 }}>
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </Box>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Paper>
  );
};

export default AddReview;
