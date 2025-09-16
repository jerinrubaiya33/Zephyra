import User from "../models/userModel.js";

// GET wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("wishlist");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, wishlist: user.wishlist || [] });
  } catch (err) {
    console.error("Get Wishlist Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ADD
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "No productId" });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { wishlist: productId }
    });
    res.json({ success: true, message: "Added to wishlist" });
  } catch (err) {
    console.error("Add Wishlist Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// REMOVE
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "No productId" });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { wishlist: productId }
    });
    res.json({ success: true, message: "Removed from wishlist" });
  } catch (err) {
    console.error("Remove Wishlist Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// SYNC (replace with bulk array)
export const syncWishlist = async (req, res) => {
  try {
    const { items } = req.body; // array of productIds
    await User.findByIdAndUpdate(req.user.id, {
      wishlist: items || []
    });
    res.json({ success: true, message: "Wishlist synced" });
  } catch (err) {
    console.error("Sync Wishlist Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
