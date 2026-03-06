import React, { useEffect, useState } from "react";
import image from "../photo/2.png"; // Use a bathrobes default image

function Bathrobes() {
  const [bathrobes, setBathrobes] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("https://truhome-backend-5.onrender.com/bathrobes");
      const data = await res.json();
      setBathrobes(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePurchase(id) {
    try {
      const res = await fetch(`https://truhome-backend-5.onrender.com/purchase/bathrobes/${id}`, { method: "POST" });
      if (res.ok) fetchItems();
      else alert("❌ Purchase failed");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="product-grid">
      {bathrobes.map((item) => (
        <div key={item.id} className="product-card">
          <img src={item.image || image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <span>Ksh {item.price}</span>
          <p>Qty: {item.quantity}</p>
          {item.quantity > 0 ? <button onClick={() => handlePurchase(item.id)}>Buy</button> : <span>Out of Stock</span>}
        </div>
      ))}
    </div>
  );
}

export default Bathrobes;