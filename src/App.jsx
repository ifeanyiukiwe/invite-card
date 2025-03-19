import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InviteForm from "./pages/InviteForm";
import InviteCard from "./pages/InviteCard";
import Footer from "./components/Footer";
import backgroundImage from "./assets/images/background-desktop.png";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<InviteForm />} />
          <Route path="/invite-card" element={<InviteCard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
