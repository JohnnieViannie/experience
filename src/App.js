import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import TopNavbar from "./components/Nav/TopNavbar";
import Footer from "./components/Sections/Footer";
import Landing from "./screens/Landing";
import Partner from "./screens/partner";
import Service from "./screens/services";
import Project from "./screens/Projects";
import SignUp from "./screens/Signup";
import About from "./screens/About";
import SearchResult from "./screens/SearchResult";
import Editor from "./screens/dashboard/Editor";
import Faq from "./screens/Faq";
import Login from "./screens/Login";
import Verify from "./screens/Verify";
import Forgot from "./screens/Forgot";
import Contactus from "./screens/Contact";
import Change from "./screens/Change";
import Pricing from "./screens/pricing";
import Dashboard from "./screens/dashboard/dashboard";
import MoreDetails from "./screens/nDetails";
import MoreOnlineDetails from "./screens/moreDetails";
import Policy from "./screens/policy";
import Terms from "./screens/terms";
import Details from "./screens/dashboard/details";
import Admin from "./screens/dashboard/admin";

export default function App() {
  return (
    <>
      <Helmet>
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css'/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap" rel="stylesheet" />
        <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" type="image/x-icon" />
      </Helmet>

      <Router>
        {window.location.pathname !== "/dashboard" &&
          window.location.pathname !== "/editor" &&
          window.location.pathname !== "/details" &&
          window.location.pathname !== "/admin" && <TopNavbar />}
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/service" element={<Service/>} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/more_details" element={<MoreDetails />} />
          <Route path="/more_Onlinedetails" element={<MoreOnlineDetails />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/searchresults" element={<SearchResult />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change" element={<Change />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/details" element={<Details/>} />
          <Route path="/editor" element={<Editor/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/pricing" element={<Pricing/>} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}