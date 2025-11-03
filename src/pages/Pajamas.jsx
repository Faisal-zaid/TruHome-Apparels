
import React, { useEffect, useState } from "react";
import image from "../photo/1.png"


function Pajamas() {
  const [pajamas, setPajamas] = useState([]);

  useEffect(() => {
    fetch("https://truhome.onrender.com/pajamas")
      .then((res) => res.json())
      .then((data) => setPajamas(data))
      .catch((err) => console.error("Error fetching pajamas:", err));
  }, []);

  return (
    <div className="product-grid">
      {pajamas.map((item) => (
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

export default Pajamas;
