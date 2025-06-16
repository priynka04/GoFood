const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Adjust path as needed
const fetchUser = require('../middleware/fetchUser');

router.post('/placeOrder', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const { orderItems } = req.body;
    console.log("Order Items:", orderItems);

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "Order is empty" });
    }

    const newOrder = new Order({
      user: userId,
      orderItems
    });

    await newOrder.save();

    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
