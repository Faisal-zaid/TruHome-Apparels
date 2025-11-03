
import React, { useEffect, useState } from "react";
import image from "../photo/1.png"

function Bathrobes() {
  const [bathrobes, setBathrobes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bathrobes")
      .then((res) => res.json())
      .then((data) => setBathrobes(data))
      .catch((err) => console.error("Error fetching pajamas:", err));
  }, []);

  return (
    <div className="product-grid">
      {bathrobes.map((item) => (
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

export default Bathrobes;
