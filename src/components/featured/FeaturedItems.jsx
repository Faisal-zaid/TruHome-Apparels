import React, { useEffect, useState } from "react";
//import "./FeaturedItems.css";

export default function FeaturedItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      // Fetch categories dynamically
      const catRes = await fetch("https://truhome-backend-8.onrender.com/categories");
      const categories = await catRes.json();

      // Fetch products for all categories
      const responses = await Promise.all(
        categories.map(cat => fetch(`https://truhome-backend-8.onrender.com/products/${cat.name}`))
      );

      const data = await Promise.all(responses.map(res => res.json()));

      // Flatten and sort by highest price
      const combined = data.flat();
      combined.sort((a, b) => b.price - a.price);

      // Take top 6
      setItems(combined.slice(0, 6));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="featured">
      <h2>Featured Items</h2>
      <div className="product-grid">
        {items.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>Ksh {item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}