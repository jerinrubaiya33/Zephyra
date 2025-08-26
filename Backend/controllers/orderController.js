import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

// Place Order (COD) & keep only latest 16 orders
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from token, not from body
    const { items, amount, address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must include items' });
    }
    if (!amount || !address) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

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
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Keep only 16 latest orders
    const allUserOrders = await orderModel.find({ userId }).sort({ date: -1 });
    if (allUserOrders.length > 16) {
      const ordersToDelete = allUserOrders.slice(16);
      const idsToDelete = ordersToDelete.map(order => order._id);
      await orderModel.deleteMany({ _id: { $in: idsToDelete } });
    }

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('placeOrder error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

const placeOrderStripe = async (req, res) => {
  res.status(501).json({ message: 'Stripe payment not implemented yet' });
};

const placeOrderRazorpay = async (req, res) => {
  res.status(501).json({ message: 'Razorpay payment not implemented yet' });
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ date: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ secure
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    const idsToKeep = orders.slice(0, 16).map(o => o._id);
    await orderModel.deleteMany({
      userId,
      _id: { $nin: idsToKeep },
    });

    const freshOrders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ orders: freshOrders });
  } catch (err) {
    console.error('userOrders error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus
};
