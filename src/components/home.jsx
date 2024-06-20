import { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import Search from "./search";
import PlaceList from "./place-list";
import VoiceSearch from "./voice-search";
import VoiceCommand from "./voice-command";
import { useLanguage } from "../language-context";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [label, setLabel] = useState("Recent Places");
  const { language } = useLanguage();

  useEffect(() => {
    fetchRecentPlaces();
  }, []);

  const fetchRecentPlaces = async () => {
    const demoData = [
      {
        name: "City Hall",
        address: "123 Main St",
        image: "https://via.placeholder.com/150",
        accessibilityFeatures: ["ramps", "wc", "hearing"],
      },
      {
        name: "Central Library",
        address: "456 Elm St",
        image: "https://via.placeholder.com/150",
        accessibilityFeatures: ["ramps", "wc"],
      },
      {
        name: "Community Park",
        address: "789 Oak St",
        image: "https://via.placeholder.com/150",
        accessibilityFeatures: ["ramps"],
      },
    ];
    setPlaces(demoData);
    setLabel("Recent Places");
  };

  const handleSearch = async (query) => {
    const demoSearchResults = [
      {
        name: "Search Result 1",
        address: "101 Pine St",
        image: "https://via.placeholder.com/150",
        accessibilityFeatures: ["ramps", "wc"],
      },
      {
        name: "Search Result 2",
        address: "202 Maple St",
        image: "https://via.placeholder.com/150",
        accessibilityFeatures: ["hearing"],
      },
    ];
    setPlaces(demoSearchResults);
    setLabel("Search Results");
    speak(`Searching for ${query}...`);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleVoiceSearch = (transcript) => {
    setSearchText(transcript);
    handleSearch(transcript);
  };

  return (
    <Container
      style={{ backgroundColor: "#333", padding: "20px", borderRadius: "8px" }}
    >
      <Typography variant="h2" gutterBottom>
        Accessibility Navigator
      </Typography>
      <Grid container spacing={2} alignItems="start">
        <Grid item xs={10}>
          <Search
            searchText={searchText}
            handleSearchChange={handleSearchChange}
            handleSearch={() => handleSearch(searchText)}
          />
        </Grid>
        <Grid item xs={2}>
          <VoiceSearch onSpeechRecognition={handleVoiceSearch} />
          {/* <VoiceCommand onSearch={handleSearch} /> */}
        </Grid>
      </Grid>
      <PlaceList places={places} label={label} />
    </Container>
  );
};

export default Home;
