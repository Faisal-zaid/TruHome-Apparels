import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

export default function AdminPanel() {

  const loggedIn = localStorage.getItem("adminLoggedIn");
  const token = localStorage.getItem("token");

  const [pendingAdmins, setPendingAdmins] = useState([]);

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: 1,
    image: null
  });

  const [editingId, setEditingId] = useState(null);

  if (!loggedIn) {
    return <h2>Access Denied</h2>;
  }

  // FETCH CATEGORIES
  async function fetchCategories() {
    try {
      const res = await fetch("https://truhome-backend-8.onrender.com/categories");

      const data = await res.json();

      setCategories(data);

      if (data.length > 0 && !category) {
        setCategory(data[0].name);
      }

    } catch (error) {
      console.error("Category fetch error:", error);
    }
  }

  // CREATE CATEGORY
  async function createCategory() {

    if (!newCategory.trim()) return;

    try {

      const res = await fetch("https://truhome-backend-8.onrender.com/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newCategory })
      });

      if (res.ok) {
        setNewCategory("");
        fetchCategories();
      }

    } catch (error) {
      console.error(error);
    }
  }

  // FETCH PRODUCTS
  async function fetchItems() {

    if (!category) return;

    try {

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/products/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setItems(data);

    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  // FETCH ADMINS
  async function fetchPendingAdmins() {

  try {

    const res = await fetch(
      "https://truhome-backend-8.onrender.com/admin/pending",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    console.log("Pending admins response:", data);

    if (res.ok) {
      setPendingAdmins(data);
    } else {
      console.error("Error fetching pending admins:", data);
    }

  } catch (err) {
    console.error("Fetch error:", err);
  }
}

  useEffect(() => {
    fetchCategories();
    fetchPendingAdmins();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [category]);

  function handleChange(e) {

    const { name, value, files } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      let imagePath = null;

      if (formData.image) {

        const imgData = new FormData();
        imgData.append("image", formData.image);

        const uploadRes = await fetch(
          "https://truhome-backend-8.onrender.com/upload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: imgData
          }
        );

        const uploadData = await uploadRes.json();

        imagePath = uploadData.image_path;
      }

      const product = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        quantity: formData.quantity,
        image: imagePath
      };

      const method = editingId ? "PATCH" : "POST";

      const url = editingId
        ? `https://truhome-backend-8.onrender.com/products/${category}/${editingId}`
        : `https://truhome-backend-8.onrender.com/products/${category}`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });

      if (res.ok) {

        alert(editingId ? "Updated successfully" : "Product added");

        setFormData({
          name: "",
          price: "",
          description: "",
          quantity: 1,
          image: null
        });

        setEditingId(null);

        fetchItems();
      }

    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {

    if (!window.confirm("Delete this item?")) return;

    try {

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/products/${category}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.ok) fetchItems();

    } catch (error) {
      console.error(error);
    }
  }

  function handleEdit(item) {

    setEditingId(item.id);

    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      quantity: item.quantity,
      image: null
    });
  }

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("adminLoggedIn");

    window.location.reload();
  }

  async function approveAdmin(id) {

    if (!window.confirm("Approve admin?")) return;

    try {

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/admin/approve/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.ok) {

        alert("Admin approved");

        fetchPendingAdmins();
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (

    <div className="admin-panel">

      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <h3>Create Category</h3>

      <input
        placeholder="Category name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />

      <button onClick={createCategory}>
        Add Category
      </button>

      <br /><br />

      <label>

        Category:

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          {categories.map(c => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}

        </select>

      </label>

      <form onSubmit={handleSubmit}>

        <h4>Product Name</h4><input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <h4>Price </h4><input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <h4>Quantity</h4><input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <h4>Description</h4><textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <h4>image</h4><input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>

      <h3>Pending Admins</h3>

      {pendingAdmins.map(a => (

        <div key={a.id}>

          <p>{a.name} - {a.email}</p>

          <button onClick={() => approveAdmin(a.id)}>
            Approve
          </button>

        </div>

      ))}

      <h3>Products</h3>

      <div className="product-list">

        {items.map(item => (

          <div key={item.id} className="product-card">

            <img src={item.image} alt={item.name} />

            <h4>Name:{item.name}</h4>

            <p>Description:{item.description}</p>

            <p>Price in Ksh {item.price}</p>

            <p>Quantity: {item.quantity}</p>

            <button onClick={() => handleEdit(item)}>
              Edit
            </button>

            <button onClick={() => handleDelete(item.id)}>
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}