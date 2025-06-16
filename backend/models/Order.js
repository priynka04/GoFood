const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {   // reference to the User model by ObjectId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: {
    type: Array,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);

