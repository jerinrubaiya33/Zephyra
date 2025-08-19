import express from 'express';
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStrip,
  allOrders,
  userOrders,
  updateStatus
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list', adminAuth, allOrders);

// This is the route to update order status (admin only)
orderRouter.post('/status', adminAuth, updateStatus);

// Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStrip);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User features
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;