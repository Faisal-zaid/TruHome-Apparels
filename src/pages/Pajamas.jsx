import React, { useEffect, useState } from "react";
import image from "../photo/1.png";
import "./Pajamas.css";

function Pajamas() {
  const [pajamas, setPajamas] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [phone, setPhone] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    try {
      const res = await fetch("https://truhome-backend-5.onrender.com/pajamas");
      const data = await res.json();
      setPajamas(data);
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
    alert(`STK Push will be sent to ${phone}`);
    closePayment();
  }

  return (
    <>
      <div className="product-grid">
        {pajamas.map((item) => (
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

      {/* PAYMENT MODAL */}
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

export default Pajamas;