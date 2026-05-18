import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./public/pages/Home";
import Contact from "./public/pages/Contact";
import Portfolio from "./public/pages/Portfolio";
import Services from "./public/pages/Services";
import About from "./public/pages/About";

import Dashboard from "./admin/pages/Dashboard";
import Projects from "./admin/pages/Projects";
import Messages from "./admin/pages/Messages";
import CEO from "./admin/pages/CEO";
import Settings from "./admin/pages/Settings";
import Login from "./admin/pages/Login";
import Footer from "./components/Footer";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./admin/components/AdminLayout";

function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader on initial mount for a brief moment
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Check if route is admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />

        {/* Admin Public */}
        <Route path="/admin" element={<Login />} />

        {/* Admin Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/projects" element={<AdminLayout><Projects /></AdminLayout>} />
          <Route path="/admin/messages" element={<AdminLayout><Messages /></AdminLayout>} />
          <Route path="/admin/ceo-settings" element={<AdminLayout><CEO /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><Settings /></AdminLayout>} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;