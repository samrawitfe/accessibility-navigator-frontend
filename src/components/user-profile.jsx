// src/components/UserProfile.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Paper, Box, Avatar } from "@mui/material";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const result = await response.json();

        if (result.success) {
          setUser(result.data);
        } else {
          setError(result.message);
          console.error("Error fetching user profile:", result.message);
        }
      } catch (error) {
        setError("An error occurred while fetching the user profile.");
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, my: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ mr: 2, bgcolor: "secondary.main" }}>
            {user.username[0].toUpperCase()}
          </Avatar>
          <Typography
            variant="h4"
            sx={{ color: "primary.main", fontWeight: "bold" }}
          >
            {user.username}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Email: {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Disability Type: {user.disabilityType}
        </Typography>
        {/* Add more user details as needed */}
      </Paper>
    </Container>
  );
};

export default UserProfile;
