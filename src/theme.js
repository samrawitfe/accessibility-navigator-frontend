// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Dark background
      paper: "#1E1E1E", // Slightly lighter grey for components
    },
    primary: {
      main: "#64B5F6", // Light blue
    },
    secondary: {
      main: "#FFB74D", // Orange
    },
    text: {
      primary: "#F5F5F5", // Light grey for text
      secondary: "#CCCCCC", // Medium grey for secondary text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h3: {
      fontSize: "2.5rem", // Adjust size
      fontWeight: 700,
      color: "#64B5F6", // Light blue for title
      marginBottom: "20px",
    },
    h4: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#FFB74D", // Orange for label
    },
    body1: {
      fontSize: "1.2rem", // Increase font size
      color: "#F5F5F5", // Light grey text
      lineHeight: 1.6, // Increase line spacing
    },
    body2: {
      fontSize: "1rem",
      color: "#CCCCCC", // Medium grey text
      lineHeight: 1.4,
    },
    textField: {
      backgroundColor: "#555",
      color: "#fff",
      marginBottom: "10px",
    },
    button: {
      marginRight: "10px",
    },
  },
});

export default theme;
