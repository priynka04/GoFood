const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const fetchUser = require('../middleware/fetchUser');

// Route to place an order
router.post('/placeOrder', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderItems } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "Order is empty" });
    }

    const newOrder = new Order({
      user: userId,
      orderItems
    });

    await newOrder.save();

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get orders of logged-in user
router.get('/myOrders', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).sort({ orderDate: -1 });

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
