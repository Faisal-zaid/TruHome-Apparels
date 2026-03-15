import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

export default function AdminPanel() {

  const loggedIn = localStorage.getItem("adminLoggedIn");
  const [pendingAdmins, setPendingAdmins] = useState([]);

  if (!loggedIn) {
    return <h2>Access Denied</h2>;
  }

  const categories = ["pajamas", "nightdress", "rompers", "bathrobes"];

  const [category, setCategory] = useState("pajamas");
  const [items, setItems] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: 1,
    image: null
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");


  useEffect(() => {
    fetchItems();
  }, [category]);


  async function fetchItems() {

    try {

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/${category}`,
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

  async function fetchPendingAdmins() {
  try {
    const res = await fetch("https://truhome-backend-8.onrender.com/admin/pending", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      setPendingAdmins(data);
    } else {
      console.error("Failed to fetch pending admins");
    }
  } catch (err) {
    console.error(err);
  }
}


  function handleChange(e) {

    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  }


  async function handleSubmit(e) {
  e.preventDefault();

  try {
    let imagePath = null;

    if (formData.image) {
      const formDataObj = new FormData();
      formDataObj.append("image", formData.image);

      const uploadRes = await fetch(
        `https://truhome-backend-8.onrender.com/pajamas/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataObj
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        alert(uploadData.message || "Image upload failed");
        return;
      }

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
      ? `https://truhome-backend-8.onrender.com/${category}/${editingId}`
      : `https://truhome-backend-8.onrender.com/${category}`;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });

    if (res.ok) {
      alert(editingId ? "✅ Updated successfully" : "✅ Product added!");
      setFormData({ name: "", price: "", description: "", quantity: 1, image: null });
      setEditingId(null);
      fetchItems();
    } else {
      const err = await res.json();
      alert(err.message || "❌ Failed");
    }
  } catch (error) {
    console.error("Submit error:", error);
  }
}

  async function handleDelete(id) {

    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/${category}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.ok) fetchItems();

    } catch (error) {

      console.error("Delete error:", error);

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

    alert("Logged out");

    window.location.reload();
  }

  useEffect(() => {
  fetchItems();
  fetchPendingAdmins(); // fetch pending admins
}, [category]);

async function approveAdmin(id) {
  if (!window.confirm("Approve this admin?")) return;

  try {
    const res = await fetch(`https://truhome-backend-8.onrender.com/admin/approve/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.ok) {
      alert("Admin approved!");
      fetchPendingAdmins(); // refresh the list
    } else {
      const err = await res.json();
      alert(err.message || "Failed to approve");
    }
  } catch (error) {
    console.error(error);
  }
}


  return (

    <div className="admin-panel">

      <div className="admin-header">

        <h2>Admin Panel - {category.toUpperCase()}</h2>

        <button onClick={logout}>Logout</button>

      </div>


      <label>

        Category:

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}

        </select>

      </label>


      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price (Ksh)"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>


      <h3>Current Items</h3>

      <h3>Pending Admins</h3>
{pendingAdmins.length === 0 ? (
  <p>No pending admins</p>
) : (
  <div className="pending-admins">
    {pendingAdmins.map((a) => (
      <div key={a.id} className="admin-card">
        <p>{a.name} - {a.email}</p>
        <button onClick={() => approveAdmin(a.id)}>Approve</button>
      </div>
    ))}
  </div>
)}


      <div className="product-list">

        {items.map((item) => (

          <div key={item.id} className="product-card">

            <img src={item.image} alt={item.name} />

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