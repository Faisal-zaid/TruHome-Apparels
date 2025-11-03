
import React, { useEffect, useState } from "react";

import image from "../photo/2.png"

function Nightdress() {
  const [nightdress, setNightdress] = useState([]);

  useEffect(() => {
    fetch("https://truhome.onrender.com/nightdress")
      .then((res) => res.json())
      .then((data) => setNightdress(data))
      .catch((err) => console.error("Error fetching pajamas:", err));
  }, []);

  return (
    <div className="product-grid">
      {nightdress.map((item) => (
        <div key={item.id} className="product-card">
          <img src={image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <span>Ksh {item.price}</span>
        </div>
      ))}
    </div>
  );
}

export default Nightdress;
