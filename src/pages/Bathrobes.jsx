import React, { useEffect, useState } from "react";
import image from "../photo/2.png";
import "./Pajamas.css";

function Bathrobes() {
  const [bathrobes, setBathrobes] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("https://truhome-backend-8.onrender.com/bathrobes");
      const data = await res.json();
      setBathrobes(data);
    } catch (err) {
      console.error(err);
    }
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

      const res = await fetch(
        `https://truhome-backend-8.onrender.com/purchase/bathrobes/${selectedItem.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: formattedPhone }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
      alert(data.message || "Payment failed");
      return;
    }

    // ✅ Optimistically update frontend quantity
    setBathrobes(prev =>
      prev.map(item =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
      alert("Mpesa prompt sent. Enter your M-Pesa PIN.");
      console.log(data);
      closePayment();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  }

  return (
    <>
      <div className="product-grid">
        {bathrobes.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image || image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span>Ksh {item.price}</span>
            <p>Qty: {item.quantity}</p>

            {item.quantity > 0 ? (
              <button onClick={() => openPayment(item)}>Buy</button>
            ) : (
              <span>Out of Stock</span>
            )}
          </div>
        ))}
      </div>

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

export default Bathrobes;