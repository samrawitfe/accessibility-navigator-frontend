import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import PlaceDetails from "./components/place-details";
import MapComponent from "./components/map-component";
import Login from "./components/login";
import UserProfile from "./components/user-profile";
import Account from "./components/account";
import ProtectedRoute from "./components/protected-route";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Header user={user} setUser={handleLogout} />
      <Routes style={{ top: "50px" }}>
        <Route path="/" element={<Home />} />
        <Route path="/place/:id" element={<PlaceDetails user={user} />} />
        <Route path="/navigate/:id" element={<MapComponent />} />
        <Route path="/login" element={<Login setUser={handleLogin} />} />
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route
          path="/account"
          element={
            <ProtectedRoute user={user}>
              <Account user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
