import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Place Order (COD) & keep only latest 16 orders
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    });

    await orderData.save();

    // Clear the cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Fetch all orders for the user, sorted by newest first
    const allUserOrders = await orderModel
      .find({ userId })
      .sort({ date: -1 });

    // If more than 16 orders, delete the older ones
    if (allUserOrders.length > 16) {
      const ordersToDelete = allUserOrders.slice(16);
      const idsToDelete = ordersToDelete.map(order => order._id);

      await orderModel.deleteMany({ _id: { $in: idsToDelete } });
    }

    res.status(201).json({ message: 'Order placed and old orders cleaned.' });
  } catch (error) {
    console.error('placeOrder error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// Placeholder for Stripe method
const placeOrderStrip = async (req, res) => {
  try {
    // Add your Stripe payment logic here
    res.status(501).json({ message: 'Stripe payment not implemented yet' });
  } catch (err) {
    res.status(500).json({ error: 'Stripe order failed' });
  }
};

// Placeholder for Razorpay method
const placeOrderRazorpay = async (req, res) => {
  try {
    // Add your Razorpay payment logic here
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
    const { userId } = req.body;

    // Get all orders for the user
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    // Keep the latest 16 orders
    const idsToKeep = orders.slice(0, 16).map(o => o._id);

    // Delete older ones
    await orderModel.deleteMany({
      userId,
      _id: { $nin: idsToKeep },
    });

    // Fetch again after deletion
    const freshOrders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ orders: freshOrders });
  } catch (err) {
    console.error('userOrders error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: Update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
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