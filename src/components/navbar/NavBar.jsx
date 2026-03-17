import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import AdminLogin from "../../pages/AdminLogin";
import AdminRegister from "../../pages/AdminRegister";

export default function NavBar({ onAdminLogin }) {

  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function handleAdminClick() {
    setShowLogin(true);
    setShowRegister(false); // make sure register modal is closed
  }

  function handleRegisterClick() {
    setShowRegister(true);
    setShowLogin(false); // make sure login modal is closed
  }

  return (
    <div className="main">

      <div className="shop-name">

        <div className="jina">TRUHOME APPARELS</div>

        <div className="icons">
          

          {/* Shopping cart icon */}
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5z"/>
          </svg>

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
              <path strokeLinecap="round" d="M19.998 18q.002-.246.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22"/>
            </g>
          </svg>

          {/* Register icon (small plus icon) */}
          <svg
  onClick={handleRegisterClick}  // <--- ADD THIS
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  style={{ cursor: "pointer", marginLeft: "8px" }}
>
  <path fill="currentColor" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"/>
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
    <Link to="/categories">
      SHOP
    </Link>
  </li>

  <li>
    <Link to="/#contact">
      CONTACT US
    </Link>
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
            }
          }}
        />
      )}

      {/* Admin Register Modal */}
      {showRegister && <AdminRegister />}

    </div>
  );
}