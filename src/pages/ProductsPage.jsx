import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import image from "../photo/3.png";
import "./ProductsPage.css";

function ProductsPage() {

  const { category } = useParams();

  const [items, setItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const { addToCart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

  fetchItems();

  const hash = window.location.hash;

  if (hash) {

    setTimeout(() => {

      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

    }, 500);

  }

}, [category]);
  async function fetchItems() {

    setLoading(true);

    try {

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/products/${category}`
      );

      const data = await res.json();

      setItems(data);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);
  }

  function openPayment(item) {

    setSelectedItem(item);
    setShowPayment(true);

  }

  function closePayment() {

    setShowPayment(false);
    setPhone("");

  }

  async function confirmPayment() {

    try {

      let formattedPhone = phone;

      if (phone.startsWith("07")) {
        formattedPhone = "254" + phone.substring(1);
      }

      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/purchase/${category}/${selectedItem.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone: formattedPhone }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment failed");
        return;
      }

      setItems(prev =>
        prev.map(item =>
          item.id === selectedItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      alert("Mpesa prompt sent. Enter your M-Pesa PIN.");

      closePayment();

    } catch (err) {

      console.error(err);

      alert("Payment failed");

    }
  }

  return (
    <>
    {loading ? (
  <div className="loading">Loading...</div>
) : (
      <div className="product-grid">

        {items.map((item) => (

          <div key={item.id} id={`product-${item.id}`} className="product-card">

            <img src={item.image || image} alt={item.name} />

            <h3>{item.name}</h3>

            <p>{item.description}</p>

            <span>Ksh {item.price}</span>

            <p>Qty: {item.quantity}</p>

            {item.quantity > 0 ? (

              <button onClick={() => addToCart({ ...item, category })}>
  Add to Cart
</button>

            ) : (

              <span>Out of Stock</span>

            )}

          </div>

        ))}

      </div>
      )}

      {showPayment && (

        <div className="payment-modal">

          <div className="payment-box">

            <h2>Mpesa Payment</h2>

            <p>{selectedItem?.name}</p>

            <p>Ksh {selectedItem?.price}</p>

            <input
              type="text"
              placeholder="Enter Mpesa Phone (07XXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button onClick={confirmPayment}>Pay Now</button>

            <button onClick={closePayment}>Cancel</button>

          </div>

        </div>

      )}

    </>
  );
}

export default ProductsPage;