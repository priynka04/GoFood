import React, { useContext, useState } from 'react';
import { CartContext } from '../components/CartContext';

export default function Cart() {
  const { cartItems, setCartItems, placeOrder } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setMessage("Cart is empty");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken') || '',
        },
        body: JSON.stringify({ orderItems: cartItems }),
      });

      const data = await response.json();
      if (response.ok) {
        placeOrder();
        setMessage("Order placed successfully!");
      } else {
        setMessage(data.error || "Failed to place order");
      }

    } catch (error) {
      setMessage("Error placing order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gh-panel mt-5">
      <h2 className="gh-panel-title">My Cart</h2>

      {message && <div className="gh-cart-message">{message}</div>}

      {cartItems.length === 0 ? (
        <p className="gh-cart-empty">Your cart is empty.</p>
      ) : (
        <div className="gh-cart-table-wrap">
          <table className="gh-cart-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price (₹)</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.quantity || 1}</td>
                  <td>₹{item.price * (item.quantity || 1)}</td>
                  <td>
                    <button
                      className="gh-btn-remove"
                      onClick={() => removeFromCart(idx)}
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="gh-cart-total-row">
                <td colSpan="2" className="text-end gh-cart-total-label">Total:</td>
                <td colSpan="2" className="gh-cart-total-value">₹{totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button
            className="gh-btn-primary gh-cart-order-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      )}
    </div>
  );
}