import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import AdminPanel from "../../pages/AdminPanel"; // import admin panel

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  function handleAdminClick() {
    const password = prompt("Enter admin password:");
    if (password === "mamaleroy") {
      setShowAdmin(true);
    } else {
      alert("oops you aint the admin");
    }
  }

  return (
    <div className="main">
      <div className="shop-name">
        <div className="jina">TRUHOME APPARELS</div>
        <div className="icons">
          {/* Shopping cart icon */}
          <svg
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

          {/* Admin icon */}
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

          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <div className={`bar ${isOpen ? "open" : ""}`}></div>
            <div className={`bar ${isOpen ? "open" : ""}`}></div>
            <div className={`bar ${isOpen ? "open" : ""}`}></div>
          </div>
        </div>
      </div>

      <nav className={`navs ${isOpen ? "active" : ""}`}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/pajamas">PAJAMAS</Link></li>
          <li><Link to="/nightdress">NIGHT DRESS</Link></li>
          <li><Link to="/rompers">ROMPERS</Link></li>
          <li><Link to="/bathrobes">BATHROBES</Link></li>
        </ul>
      </nav>

      {showAdmin && <AdminPanel />}
    </div>
  );
}
