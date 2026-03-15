import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NewArrivals.css";

export default function NewArrivals() {
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

      // Flatten and sort by newest
      const combined = data.flat();
      combined.sort((a, b) => b.id - a.id);

      // Take top 6
      setItems(combined.slice(0, 6));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="arrivals">
      <h2>New Arrivals</h2>
      <div className="product-grid">
        {items.map(item => (
          <Link 
            to={`/category/${item.category}`} 
            key={item.id} 
            className="product-card-link"
          >
            <div className="product-card">
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>Ksh {item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}