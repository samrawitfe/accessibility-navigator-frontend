import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddReview from "./add-review";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Avatar,
  Grid,
  ImageList,
  ImageListItem,
  Divider,
} from "@mui/material";
import { CoPresentOutlined } from "@mui/icons-material";

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

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);

  // useEffect(() => {
  //   // Fetch place details using the id
  //   // For now, we'll use dummy data

  //   const fetchedPlace = {
  //     id: 90,
  //     name: "obchodní dům Centrum",
  //     name_en: "Supermarket Centrum",
  //     type: "obchod",
  //     accessibility: "přístupné",
  //     address: "Kobližná 24",
  //     coordinates: [16.6123939938643, 49.1952034305194],
  //     description:
  //       "Barrier-free access from Kobližná and Jánská streets, photocell doors, 2 lifts to all floors (door 80, width 160, depth 140 cm).; Services: clothes, real estate agency, massage….",
  //     website: "www.example.com",
  //     phone: "542 123 710",
  //     reviews: [
  //       {
  //         user: "Elena",
  //         comment: "it's accessible",
  //         images: ["https://www.archiweb.cz/Image/zpravy/2015/03/vankovka.jpg"],
  //       },
  //       {
  //         user: "Jane",
  //         comment: "Great place, very convenient",
  //         images: [
  //           "https://via.placeholder.com/150",
  //           "https://via.placeholder.com/150",
  //         ],
  //       },
  //     ],
  //   };
  //   setPlace(fetchedPlace);
  // }, [id]);

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

  const handleStartNavigation = () => {
    console.log(place.coordinates);
    navigate(`/navigate/${id}`, {
      state: { destination: place.coordinates },
    });
    // [16.6123939938643, 49.1952034305194]
  };

  const handleAddReview = async (newReview) => {
    try {
      const response = await fetch(`/api/places/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure you have the token available
        },
        body: JSON.stringify(newReview),
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
            {placeDetails.name}
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

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h5"
          gutterBottom
          sx={{ mb: 3, color: "primary.main" }}
        >
          Reviews
        </Typography>
        <AddReview onAddReview={handleAddReview} />
        <Grid container spacing={3}>
          {reviews.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={2} sx={{ p: 3, bgcolor: "background.paper" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: "secondary.main" }}>
                    {review.user && review.user.username
                      ? review.user.username[0].toUpperCase()
                      : "U"}
                  </Avatar>
                  <Typography variant="h6">
                    {review.user && review.user.username
                      ? review.user.username
                      : "Unknown User"}
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
      </Paper>
    </Container>
  );
};

export default PlaceDetails;
