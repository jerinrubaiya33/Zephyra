import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.error("AddToCart Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const user = await userModel.findById(userId);
    const cartData = user.cartData || {};

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    console.error("UpdateCart Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("GetUserCart Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
