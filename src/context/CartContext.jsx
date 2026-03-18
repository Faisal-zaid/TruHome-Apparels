import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

function addToCart(item) {
  setCart(prev => {
    const existing = prev.find(p => p.id === item.id);

    if (existing) {
      return prev.map(p =>
        p.id === item.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    }

    return [...prev, { ...item, quantity: 1 }];
  });
}

function removeFromCart(id) {
  setCart(prev => prev.filter(item => item.id !== id));
}

function increaseQty(id) {
  setCart(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}

function decreaseQty(id) {
  setCart(prev =>
    prev.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
}
function clearCart() {
  setCart([]);
}
  return (
   <CartContext.Provider value={{
  cart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
}}>
      {children}
    </CartContext.Provider>
  );
}