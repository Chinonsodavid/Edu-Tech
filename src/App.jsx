import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Blackdiv from "./components/Blackdiv";
import Footer2 from "./components/Footer2";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ContactPage from "./components/ContactPage";
import Chatbot from "./components/Chatbot";
import CategoryPage from "./components/Category";
import ProfilePage from "./components/Profile";
import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
      <ScrollToTop />
        <MainLayout />
        <Chatbot />
      </Router>
    </>
  );
}

function MainLayout() {
  const location = useLocation(); // Get the current page route

  // Hide Navbar & Footer only on the login page
  const hiddenPages = ["/login", "/signup"];
  const hideLayout = hiddenPages.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Blackdiv />}
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      {!hideLayout && <Footer2 />}
    </>
  );
}

export default App;
