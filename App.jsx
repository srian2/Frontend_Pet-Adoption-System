import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import AddPet from "./components/addpet";
import Adopt from "./components/adoption";
import Settings from "./components/settings";
import Navbar from "./components/Navbar";

const AppLayout = () => {
  const location = useLocation(); // Get the current URL path

  // Hide Navbar on login and signup pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />} {/* Render Navbar only when NOT on login or signup */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addpet" element={<AddPet />} />
        <Route path="/adoption" element={<Adopt />} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
