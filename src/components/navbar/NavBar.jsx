import React, { useState, useContext } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import AdminLogin from "../../pages/AdminLogin";
import AdminRegister from "../../pages/AdminRegister";
import { CartContext } from "../../context/CartContext";

export default function NavBar({ onAdminLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // WhatsApp Phone Number (Replace with your actual business number including country code)
  const whatsappNumber = "254700000000"; 
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20TRUHOME%20APPARELS,%20I%20have%20an%20inquiry.`;

  function handleAdminClick() {
    setShowLogin(true);
    setShowRegister(false);
  }

  function handleRegisterClick() {
    setShowRegister(true);
    setShowLogin(false);
  }

  const handleShopCollectionClick = (e) => {
    e.preventDefault();
    const featuredElem = document.getElementById("featured");
    if (featuredElem) {
      featuredElem.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#featured");
    }
  };

  return (
    <div className="main">
      <div className="shop-name">
        <div className="jina">TRUHOME APPARELS</div>

        <div className="icons">
          {/* Shopping cart icon */}
          <div className="cart-icon-wrapper" onClick={() => navigate("/cart")}>
            <svg
              style={{ cursor: "pointer" }}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5z"
              />
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </div>

          {/* Admin icon*/}
          <svg
            onClick={handleAdminClick}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ cursor: "pointer" }}
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="6" r="4" />
              <path
                strokeLinecap="round"
                d="M19.998 18q.002-.246.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22"
              />
            </g>
          </svg>

          {/* Register icon */}
          <svg
            onClick={handleRegisterClick}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ cursor: "pointer" }}
          >
            <path
              fill="currentColor"
              d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"
            />
          </svg>

          {/* Hamburger */}
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <div className={`bar ${isOpen ? "open" : ""}`}></div>
            <div className={`bar ${isOpen ? "open" : ""}`}></div>
            <div className={`bar ${isOpen ? "open" : ""}`}></div>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className={`navs ${isOpen ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/categories">SHOP</Link>
          </li>
          <li>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              CONTACT US
            </a>
          </li>
        </ul>
      </nav>

      {/* Admin Login Modal */}
      {showLogin && (
        <AdminLogin
          onLogin={(success) => {
            if (success) {
              setShowLogin(false);
              onAdminLogin(true);
              navigate("/admin");
            }
          }}
        />
      )}

      {/* Admin Register Modal */}
      {showRegister && <AdminRegister />}

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">Elegance & Perfection</span>
          <h1 className="hero-title">TRUHOME APPARELS</h1>
          <p className="hero-description">
            Discover curated fashion, luxury fits, and premium quality crafted for your everyday style.
          </p>
          <div className="hero-buttons">
            <a href="#featured" onClick={handleShopCollectionClick} className="btn-primary">
              Shop Collection
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}