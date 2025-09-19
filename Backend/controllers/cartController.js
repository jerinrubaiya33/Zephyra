import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // Validate input
    if (!userId || !itemId || !size) {
      return res.status(400).json({ success: false, message: 'Missing userId, itemId, or size' });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: 'Added to cart', cartData });
  } catch (error) {
    console.error("AddToCart Error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Update cart item quantity
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId || !itemId || !size) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const cartData = user.cartData || {};

    if (quantity <= 0) {
      if (cartData[itemId] && cartData[itemId][size] !== undefined) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
    res.json({ success: true, message: 'Cart updated', cartData });
  } catch (error) {
    console.error("UpdateCart Error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ success: false, message: 'User ID is required' });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.error("GetUserCart Error:", error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export { addToCart, updateCart, getUserCart };