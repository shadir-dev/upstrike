// App.js
import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import Gallery from "./pages/gallery";
import Clientelle from "./pages/clientelle";
import Contacts from "./pages/contacts";
import Login from "./pages/login";
import ProtectedRoute from "./components/protected route";

// Admin pages
import AdminLayout from "./pages/adminlayout";
import AdminDashboard from "./pages/admindashboard";
import AdminHome from "./pages/adminhome";
import AdminAbout from "./pages/adminabout";
import AdminServices from "./pages/adminservices";
import AdminGallery from "./pages/admingallery";
import AdminClientelle from "./pages/adminclientelle";

import "./App.css";

// Create Theme Context
export const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <BrowserRouter>
          <Routes>
            {/* Public site layout */}
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="clientelle" element={<Clientelle />} />
              <Route path="contacts" element={<Contacts />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="clientelle" element={<AdminClientelle />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
