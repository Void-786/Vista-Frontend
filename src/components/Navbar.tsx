import { useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/navbar.css";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuOpen && !e.target.closest('.navbar')) {
        setMobileMenuOpen(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo" onClick={() => scrollToSection("home")}>
          <span className="logo-text">Vista Tours & Travels</span>
        </div>
        <div className="nav-links">
          <div onClick={() => scrollToSection("home")} className="nav-link">
            Home
          </div>
          <div
            onClick={() => navigateToPage("/who-we-are")}
            className={`nav-link ${
              location.pathname === "/who-we-are" ? "active" : ""
            }`}
          >
            Who We Are
          </div>
          <div onClick={() => scrollToSection("cars")} className="nav-link">
            Cars
          </div>
          <div onClick={() => scrollToSection("packages")} className="nav-link">
            Our Packages
          </div>
          <div onClick={() => scrollToSection("contact")} className="nav-link">
            Contact Us
          </div>
          <div onClick={() => scrollToSection("query")} className="nav-link">
            Customize Trip
          </div>
        </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <FaBars style={{ color: "#7D0A0A" }} />
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-links open">
          <div onClick={() => scrollToSection("home")} className="mobile-nav-link">
            Home
          </div>
          <div
            onClick={() => navigateToPage("/who-we-are")}
            className={`mobile-nav-link ${
              location.pathname === "/who-we-are" ? "active" : ""
            }`}
          >
            Who We Are
          </div>
          <div onClick={() => scrollToSection("cars")} className="mobile-nav-link">
            Cars
          </div>
          <div onClick={() => scrollToSection("packages")} className="mobile-nav-link">
            Our Packages
          </div>
          <div onClick={() => scrollToSection("contact")} className="mobile-nav-link">
            Contact Us
          </div>
          <div onClick={() => scrollToSection("query")} className="mobile-nav-link">
            Customize Trip
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
