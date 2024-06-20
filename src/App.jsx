import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";

function App() {
  return (
    <Router>
      <Header />
      <Routes style={{ top: "50px" }}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/account" element={<Account />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
