import React from "react";
import { TextField, Button, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ searchText, handleSearchChange, handleSearch, children }) => {
  return (
    <Grid item xs={12}>
      <Grid container direction="column" spacing={2} alignItems="end">
        <Grid item xs={12} style={{ width: "100%" }}>
          <TextField
            label="Search for Places"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: children,
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;
