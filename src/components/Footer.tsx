import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Increased timeout to ensure page loads completely
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="footer" style={{ backgroundColor: "#7D0A0A", backgroundImage: "linear-gradient(135deg, #7D0A0A 0%, #BF3131 100%)" }}>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Know Travel Explorers</h3>
          <ul>
            <li>
              <a href="#home" onClick={(e) => scrollToSection("home", e)}>
                Home
              </a>
            </li>
            <li>
              <Link to="/who-we-are">Who We Are</Link>
            </li>
            <li>
              <a
                href="#packages"
                onClick={(e) => scrollToSection("packages", e)}
              >
                Packages
              </a>
            </li>
            <li>
              <a href="#cars" onClick={(e) => scrollToSection("cars", e)}>
                Cars
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => scrollToSection("contact", e)}>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Policies & FAQ's</h3>
          <ul>
            {/* <li><a href="/terms"></a></li> */}
            {/* <li><a href="/privacy">Privacy Policy</a></li> */}
            <li>
              <Link to="/bookings">Bookings & Refund Policy</Link>
            </li>
            <li>
              <Link to="/faqs">FAQ's</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Reviews</h3>
          <ul>
            <li>
              <a href="#feedback-section" onClick={(e) => scrollToSection("feedback-section", e)}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="mailto:faizullahkhan2209@gmail.com">
                Email ID: faizullahkhan2209@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <Link to="/admin/login" className="admin-login-btn">
            Login as Admin
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p> © 2024 Safari. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
