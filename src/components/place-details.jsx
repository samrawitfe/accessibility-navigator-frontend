import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceHeader from "./place-header";
import PlaceDetailsInfo from "./place-details-info";
import AddReview from "./add-review";
import ReviewList from "./review-list";
import { Container, Typography, Paper, Divider } from "@mui/material";

const PlaceDetails = ({ user }) => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(`/api/places/${id}`);
        const result = await response.json();

        if (result.success) {
          setPlace(result.data);
        } else {
          console.error("Error fetching place details:", result.message);
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  const handleAddReview = async (formData) => {
    try {
      const response = await fetch(`/api/places/${id}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`, // Ensure you have the token available
        },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setPlace((prevPlace) => ({
          ...prevPlace,
          reviews: [...prevPlace.reviews, result.data],
        }));
      } else {
        console.error("Error adding review:", result.message);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (!place) {
    return <Typography>Loading...</Typography>;
  }

  const { place: placeDetails, reviews } = place;

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, my: 4 }}>
        <PlaceHeader
          placeName={placeDetails.name}
          placeId={id}
          coordinates={placeDetails.coordinates}
        />
        <PlaceDetailsInfo placeDetails={placeDetails} />
        <Divider sx={{ my: 4 }} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3, color: "primary.main" }}
        >
          Reviews
        </Typography>
        <AddReview onAddReview={handleAddReview} user={user} />
        <ReviewList reviews={reviews} />
      </Paper>
    </Container>
  );
};

export default PlaceDetails;
