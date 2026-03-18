import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./CartPage.css";

export default function CartPage() {

  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useContext(CartContext);
  const [phone, setPhone] = useState("");
  

async function checkout(phone) {

  let formattedPhone = phone;

  if (phone.startsWith("07")) {
    formattedPhone = "254" + phone.substring(1);
  }

  try {

    const res = await fetch(
      "https://truhome-backend-8.onrender.com/purchase/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: formattedPhone,
          items: cart
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Mpesa prompt sent!");
    clearCart();

  } catch (err) {
    console.error(err);
  }
}
  const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

  return (
    <div className="cart-page">

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (

        <>
         {cart.map(item => (
  <div key={item.id} className="cart-item">

    <img src={item.image} alt={item.name} />

    <h4>{item.name}</h4>

    <p>Ksh {item.price}</p>

    <div className="qty-controls">
      <button onClick={() => decreaseQty(item.id)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => increaseQty(item.id)}>+</button>
    </div>

    <button onClick={() => removeFromCart(item.id)}>
      Remove
    </button>

  </div>
))}
  
          <h3>Total: Ksh {total}</h3>

          <input
            placeholder="07XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={() => checkout(phone)}>Checkout</button>
        </>
      )}

    </div>
  );
}