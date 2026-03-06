import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

export default function AdminPanel() {
  const categories = ["pajamas", "nightdress", "rompers", "bathrobes"];
  const [category, setCategory] = useState("pajamas");
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: 1,
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [category]);

  async function fetchItems() {
    try {
      const res = await fetch(`https://truhome-backend-5.onrender.com/${category}`);
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    if (formData.image) data.append("image", formData.image);

    const method = editingId ? "PATCH" : "POST";
    const url = editingId
      ? `https://truhome-backend-5.onrender.com/${category}/${editingId}`
      : `https://truhome-backend-5.onrender.com/${category}`;

    try {
      const res = await fetch(url, {
        method,
        body: data, // Send FormData, not JSON
      });

      if (res.ok) {
        alert(editingId ? "✅ Updated successfully" : "✅ Product added!");
        setFormData({ name: "", price: "", description: "", quantity: 1, image: null });
        setEditingId(null);
        fetchItems();
      } else {
        const errorMsg = await res.text();
        alert("❌ Failed: " + errorMsg);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`https://truhome-backend-5.onrender.com/${category}/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: item.quantity,
      image: null,
    });
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel - {category.toUpperCase()}</h2>

      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price (Ksh)" value={formData.price} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      <h3>Current Items</h3>
      <div className="product-list">
        {items.map((item) => (
          <div key={item.id} className="product-card">
            {item.image && <img src={item.image} alt={item.name} />}
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p>Price: Ksh {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}