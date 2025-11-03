import React, { useState } from "react";
//import "./AdminPanel.css";

export default function AdminPanel() {
  const [category, setCategory] = useState("pajamas");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

async function handleSubmit(e) {
  e.preventDefault();

  const newProduct = {
    name: formData.name,
    price: formData.price,
    description: formData.description,
    image: URL.createObjectURL(formData.image),
  };

  try {
    const response = await fetch(`http://localhost:5000/${category}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      alert(`✅ Product added to ${category}!`);
      setFormData({ name: "", price: "", description: "", image: null });
    } else {
      alert("❌ Failed to add product");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="pajamas">Pajamas</option>
            <option value="nightdress">Nightdress</option>
            <option value="rompers">Rompers</option>
            <option value="bathrobes">Bathrobes</option>
          </select>
        </label>

        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price (Ksh):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Upload Image:
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
