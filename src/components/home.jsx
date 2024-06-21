import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  List,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import Search from "./search";
import VoiceSearch from "./voice-search";
import { useLanguage } from "../language-context";
import PlaceCard from "./place-card";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [label, setLabel] = useState("Recent Places");
  const [loading, setLoading] = useState(false); // State to manage loading state
  const { language } = useLanguage();

  useEffect(() => {
    fetchRecentPlaces();
  }, []);

  const fetchRecentPlaces = async () => {
    const demoData = [
      {
        id: 90,
        name: "obchodní dům Centrum",
        name_en: "Supermarket Centrum",
        type: "obchod",
        accessibility: "přístupné",
        address: "Kobližná 24",
        coordinates: [16.6123939938643, 49.1952034305194],
        description:
          "Barrier-free access from Kobližná and Jánská streets, photocell doors, 2 lifts to all floors (door 80, width 160, depth 140 cm).; Services: clothes, real estate agency, massage….",
        website: null,
        phone: "542 123 710",
      },
      {
        id: 115,
        name: "knihkupectví Dobrovský",
        name_en: "Bookshop Dobrovský",
        type: "obchod",
        accessibility: "přístupné",
        address: "Joštova 6",
        coordinates: [16.6054495992421, 49.1978478422511],
        description:
          "Access via main entrance with photocell door from Joštova street. Lift to all floors (door 80, width 110, depth 140 cm). There is a café on the second floor and barrier-free WC I (width 180, depth 200 cm) in the right wing of the shop. There is a narrow sp",
        website: "www.knihydobrovsky.cz",
        phone: "542 220 320",
      },
      {
        id: 130,
        name: "IBC centrum",
        name_en: "IBC centre",
        type: "obchod",
        accessibility: "přístupné",
        address: "Příkop 4, 6 a 8",
        coordinates: [16.6138723527446, 49.1998708357922],
        description:
          "Barrier-free entrances from Příkop street or via footbridge from the park behind Janáček Theatre. There are large lifts in the facility. Barrier-free WC I. (width 160, depth 180 cm) on 1st floor section B, WC is locked, key available at the reception desk ",
        website: "www.unistav.cz",
        phone: "545 171 717",
      },
    ];
    setPlaces(demoData);
    setLabel("Recent Places");
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      console.log("Searching for", query);
      const response = await fetch(`/api/places/search?q=${query}`);
      const searchResults = await response.json();
      console.log(searchResults);

      const transformedResults = searchResults.data.map((result) => ({
        name: result.name,
        address: result.address,
        coordinates: result.coordinates,
        description: result.description,
        phone: result.phone,
        website: result.website,
        accessibility: result.accessibility,
      }));

      setPlaces(transformedResults);
      setLabel(`Search Results for "${query}"`);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleVoiceSearch = (transcript) => {
    setSearchText(transcript);
    handleSearch(transcript);
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper
        elevation={3}
        sx={{ p: 3, borderRadius: 2, backgroundColor: "background.paper" }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: "primary.main",
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Accessibility Navigator
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Search
            searchText={searchText}
            handleSearchChange={handleSearchChange}
            handleSearch={() => handleSearch(searchText)}
          >
            <VoiceSearch onSpeechRecognition={handleVoiceSearch} />{" "}
          </Search>
        </Grid>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: "secondary.main",
            fontSize: "1.5rem",
            marginBottom: "20px",
          }}
        >
          {label}
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <>
            {places.length === 0 && (
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                No results found for "{searchText}"
              </Typography>
            )}
            <List>
              {places.map((place, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <PlaceCard place={place} />
                </Box>
              ))}
            </List>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
