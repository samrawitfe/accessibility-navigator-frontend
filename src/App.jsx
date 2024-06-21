import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import PlaceDetails from "./components/place-details";
import MapComponent from "./components/map-component";

function App() {
  return (
    <Router>
      <Header />
      <Routes style={{ top: "50px" }}>
        <Route path="/" element={<Home />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/navigate/:id" element={<MapComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
