import React, { useEffect, useState } from "react";
import image from "../photo/3.png";

function Rompers() {
  const [rompers, setRompers] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("http://127.0.0.1:5000/rompers");
      const data = await res.json();
      setRompers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePurchase(id) {
    try {
      const res = await fetch(`http://127.0.0.1:5000/purchase/rompers/${id}`, { method: "POST" });
      if (res.ok) fetchItems();
      else alert("❌ Purchase failed");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="product-grid">
      {rompers.map((item) => (
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

export default Rompers;