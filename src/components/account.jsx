// src/components/Account.js
import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Avatar } from "@mui/material";

const Account = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setUserInfo(data.data);
        } else {
          console.error("Error fetching user info:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  if (!userInfo) {
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
      </Paper>
    </Container>
  );
};

export default Account;
