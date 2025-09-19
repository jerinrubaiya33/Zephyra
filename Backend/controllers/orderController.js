import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Place Order (COD)
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    const orderData = new orderModel({
      userId: req.user.id, // use auth middleware user
      items,
      address,
      amount,
      paymentMethod: paymentMethod || 'COD',
      payment: paymentMethod === 'COD' ? false : true,
      date: Date.now(),
      status: 'Order Placed'
    });

    await orderData.save();

    // Clear the cart after placing order
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    res.status(201).json({ success: true, message: 'Order placed successfully', order: orderData });
  } catch (error) {
    console.error('placeOrder error:', error);
    res.status(500).json({ success: false, error: 'Failed to place order' });
  }
};

// Placeholder for Stripe method
const placeOrderStrip = async (req, res) => {
  try {
    res.status(501).json({ message: 'Stripe payment not implemented yet' });
  } catch (err) {
    res.status(500).json({ error: 'Stripe order failed' });
  }
};

// Placeholder for Razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    res.status(501).json({ message: 'Razorpay payment not implemented yet' });
  } catch (err) {
    res.status(500).json({ error: 'Razorpay order failed' });
  }
};

// Admin: Get all orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// User: Get orders and keep only latest 16
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; // get from auth middleware

    // Get all orders for the user
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    // Keep only latest 16 orders
    const idsToKeep = orders.slice(0, 16).map(o => o._id);

    // Delete older ones
    await orderModel.deleteMany({
      userId,
      _id: { $nin: idsToKeep },
    });

    // Fetch again after deletion
    const freshOrders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ success: true, orders: freshOrders });
  } catch (err) {
    console.error('userOrders error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

// Admin: Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update order status' });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStrip,
  allOrders,
  userOrders,
  updateStatus
};
