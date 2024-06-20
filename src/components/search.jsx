import React from "react";
import { TextField, Button } from "@mui/material";
const Search = ({ searchText, handleSearchChange, handleSearch }) => {
  return (
    <div>
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ marginRight: "10px" }}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
