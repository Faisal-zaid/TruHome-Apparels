import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedItems.css";

export default function FeaturedItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    try {
      const catRes = await fetch("https://truhome-backend-8.onrender.com/categories");
      const categories = await catRes.json();

      const responses = await Promise.all(
        categories.map(cat =>
          fetch(`https://truhome-backend-8.onrender.com/products/${cat.name}`)
        )
      );

      const data = await Promise.all(responses.map(res => res.json()));

      const combined = data.flat().map((item, index) => {
        const catIndex = Math.floor(index / (data[0]?.length || 1));
        return {
          ...item,
          category: categories[catIndex]?.name
        };
      });

      combined.sort((a, b) => b.price - a.price);
      setItems(combined.slice(0, 6));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  function openProduct(item) {
    navigate(`/${item.category}#product-${item.id}`);
  }

  return (
    <div className="featured" id="featured">
      <h2>Featured Items</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="product-grid">
          {items.map(item => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => openProduct(item)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <p>Ksh {item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}