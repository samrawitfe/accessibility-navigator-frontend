import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F5E6D3", // Soft beige
      paper: "#FFFFFF", // White
    },
    primary: {
      main: "#7D6E83", // Muted purple
    },
    secondary: {
      main: "#A4BE7B", // Sage green
    },
    text: {
      primary: "#5C4033", // Rich brown
      secondary: "#8B7355", // Lighter brown
    },
    error: {
      main: "#D2691E", // Chocolate
    },
    warning: {
      main: "#CD853F", // Peru
    },
    success: {
      main: "#556B2F", // Dark olive green
    },
    info: {
      main: "#708090", // Slate gray
    },
  },
  typography: {
    fontFamily: "'Roboto Slab', serif",
    h3: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#5C4033", // Rich brown
      marginBottom: "20px",
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#5C4033", // Rich brown
    },
    body1: {
      fontSize: "1.1rem",
      color: "#5C4033", // Rich brown
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.95rem",
      color: "#8B7355", // Lighter brown
      lineHeight: 1.4,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#7D6E83", // Muted purple
          color: "#FFFFFF", // White
          borderRadius: "6px",
          padding: "8px 16px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#6A5D70", // Darker muted purple
          },
          "&:active": {
            backgroundColor: "#574C5D", // Even darker muted purple
          },
          "&.Mui-disabled": {
            backgroundColor: "#D3D3D3", // Light gray
            color: "#8B7355", // Lighter brown
          },
          marginRight: "10px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // White
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#A4BE7B", // Sage green
            },
            "&:hover fieldset": {
              borderColor: "#7D6E83", // Muted purple
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7D6E83", // Muted purple
            },
          },
          "& .MuiInputLabel-root": {
            color: "#8B7355", // Lighter brown
          },
          "& .MuiInputBase-input": {
            color: "#5C4033", // Rich brown
          },
          marginBottom: "10px",
        },
      },
    },
  },
});

export default theme;
