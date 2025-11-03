import React from "react";
import { useState } from "react";
import "./NavBar.css";

export default function NavBar() {

const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="main">
      <div className="shop-name">
        <div className="jina">TRUE HOME APPARELS</div>
        <div className="icons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5zM5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h11q.425 0 .713.288T19 16t-.288.713T18 17H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H2q-.425 0-.712-.288T1 3t.288-.712T2 2h1.625q.275 0 .525.15t.375.425zm3.35 7h7z"
            />
          </svg>
          {/* above is icon for shopping while below is for user admin */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="6" r="4" />
              <path
                stroke-linecap="round"
                d="M19.998 18q.002-.246.002-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
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
          <li>HOME</li>
          <li>PAJAMAS</li>
          <li>NIGHT DRESS</li>
          <li> ROMPERS</li>
          <li>BATHROBES</li>
        </ul>
      </nav>
    </div>
  );
}
