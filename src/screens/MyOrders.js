import React, { useEffect, useState } from 'react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/myOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authToken') || '',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders || []);
          setMessage('');
        } else {
          setMessage(data.error || 'Failed to fetch orders');
        }
      } catch (error) {
        setMessage('Error fetching orders: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="gh-panel gh-orders-panel mt-5">
      <h2 className="gh-panel-title mb-4">My Orders</h2>

      {loading ? (
        <p className="gh-orders-message">Loading your orders...</p>
      ) : message ? (
        <p className="gh-orders-message">{message}</p>
      ) : orders.length === 0 ? (
        <p className="gh-orders-message">You have no past orders.</p>
      ) : (
        <div>
          {orders.map((order, idx) => (
            <div key={idx} className="gh-order-card mb-5">
              <div className="gh-order-header">
                <h5 className="gh-order-title">Order #{order._id || idx + 1}</h5>
                <span className="gh-order-date">
                  {new Date(order.orderDate || order.date).toLocaleString()}
                </span>
              </div>
              <table className="gh-order-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.orderItems || []).map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.quantity || 1}</td>
                      <td>₹{item.price * (item.quantity || 1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="gh-order-total">
                Total: ₹
                {(order.orderItems || []).reduce(
                  (sum, item) => sum + item.price * (item.quantity || 1),
                  0
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}