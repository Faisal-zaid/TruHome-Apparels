import React, { useEffect, useState } from "react";
import image from "../photo/2.png";

function Nightdress() {
  const [nightdress, setNightdress] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("http://127.0.0.1:5000/nightdress");
      const data = await res.json();
      setNightdress(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePurchase(id) {
    try {
      const res = await fetch(`http://127.0.0.1:5000/purchase/nightdress/${id}`, { method: "POST" });
      if (res.ok) fetchItems();
      else alert("❌ Purchase failed");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="product-grid">
      {nightdress.map((item) => (
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

export default Nightdress;