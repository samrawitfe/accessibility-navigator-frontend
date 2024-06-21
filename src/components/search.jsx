import React from "react";
import { TextField, Button, Grid } from "@mui/material";
const Search = ({ searchText, handleSearchChange, handleSearch, children }) => {
  return (
    <Grid item xs={12} marginBottom={4}>
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Search for Places"
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
            variant="filled"
            InputProps={{
              style: {
                backgroundColor: "#555",
                color: "#fff",
                marginBottom: "10px",
              },
            }}
            InputLabelProps={{ style: { color: "#aaa" } }}
          />
          {children}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginRight: "10px" }}
        >
          Search
        </Button>
      </div>
    </Grid>
  );
};

export default Search;
