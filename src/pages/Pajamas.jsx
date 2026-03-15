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
      const res = await fetch("https://truhome-backend-8.onrender.com/pajamas");
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
  try {
    let formattedPhone = phone;

    if (phone.startsWith("07")) {
      formattedPhone = "254" + phone.substring(1);
    }

   const token = localStorage.getItem("token");
const res = await fetch(
  `https://truhome-backend-8.onrender.com/purchase/pajamas/${selectedItem.id}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // add this
    },
    body: JSON.stringify({ phone: formattedPhone }),
  }
);

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Payment failed");
      return;
    }

    // ✅ Optimistically update frontend quantity
    setPajamas(prev =>
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
        {pajamas.map((item) => (
          <div key={item.id} className="product-card">
             <img src={item.image || image} alt={item.name} />
            <h3>name: {item.name}</h3>
            <p>Description: {item.description}</p>
            <span>price: Ksh {item.price}</span>
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