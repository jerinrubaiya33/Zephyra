import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

export const ShopContext = createContext({
  setShowSearch: () => {},
  getCartCount: () => 0,
  getWishlistCount: () => 0,
});

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState([]);

  // ----------------- INIT -----------------
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Local fallback wishlist if not logged in
  useEffect(() => {
    if (!token) {
      try {
        const stored = localStorage.getItem("wishlistItems");
        setWishlistItems(stored ? JSON.parse(stored) : []);
      } catch (err) {
        setWishlistItems([]);
      }
    }
  }, [token]);

  // Mirror wishlist to localStorage always
  useEffect(() => {
    try {
      localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    } catch {}
  }, [wishlistItems]);

  // ----------------- WISHLIST API -----------------
  const fetchWishlistFromServer = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/wishlist/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && Array.isArray(res.data.wishlist)) {
        setWishlistItems(res.data.wishlist);
        localStorage.setItem("wishlistItems", JSON.stringify(res.data.wishlist));
      } else {
        setWishlistItems([]);
        localStorage.setItem("wishlistItems", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error fetching wishlist", error);
      toast.error("Could not load wishlist from server.");
    }
  };

  const syncLocalWishlistToServer = async (localItems = []) => {
    if (!token || !Array.isArray(localItems) || localItems.length === 0) return;
    try {
      await axios.post(
        `${backendUrl}/api/wishlist/sync`,
        { items: localItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.warn("Bulk sync failed, fallback to per-item add.", err);
      try {
        for (const productId of localItems) {
          await axios.post(
            `${backendUrl}/api/wishlist/add`,
            { productId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      } catch (innerErr) {
        console.error("Fallback sync failed", innerErr);
      }
    }
  };

  useEffect(() => {
    const handleAuthChange = async () => {
      if (token) {
        try {
          const stored = localStorage.getItem("wishlistItems");
          const localItems = stored ? JSON.parse(stored) : [];
          if (localItems.length > 0) {
            await syncLocalWishlistToServer(localItems);
          }
        } catch {}
        await fetchWishlistFromServer();
      } else {
        try {
          const stored = localStorage.getItem("wishlistItems");
          setWishlistItems(stored ? JSON.parse(stored) : []);
        } catch {
          setWishlistItems([]);
        }
      }
    };
    handleAuthChange();
  }, [token]);

  const toggleWishlist = async (productId) => {
    if (!productId) return;
    const currentlyIn = wishlistItems.includes(productId);

    setWishlistItems((prev) =>
      currentlyIn ? prev.filter((id) => id !== productId) : [...prev, productId]
    );

    try {
      if (token) {
        if (currentlyIn) {
          await axios.post(
            `${backendUrl}/api/wishlist/remove`,
            { productId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          await axios.post(
            `${backendUrl}/api/wishlist/add`,
            { productId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
        await fetchWishlistFromServer();
      }
    } catch (err) {
      console.error("Error updating wishlist", err);
      await fetchWishlistFromServer();
      toast.error("Could not update wishlist on server.");
    }
  };

  const isInWishlist = (productId) => wishlistItems.includes(productId);
  const getWishlistCount = () => wishlistItems.length;

  // ----------------- CART -----------------
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const cleanedCart = {};
    for (const itemId in cartItems) {
      const sizeMap = cartItems[itemId];
      const valid = {};
      for (const size in sizeMap) {
        if (sizeMap[size] > 0) valid[size] = sizeMap[size];
      }
      if (Object.keys(valid).length > 0) cleanedCart[itemId] = valid;
    }
    localStorage.setItem("cartItems", JSON.stringify(cleanedCart));
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast("⚠️ Select Product Size", toastOptions());
      return;
    }

    let cartData = structuredClone(cartItems);
    const currentQty = cartData[itemId]?.[size] || 0;

    if (currentQty >= 5) {
      toast("⚠️ Max 5 allowed", toastOptions());
      return;
    }

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    // ✅ Dynamic toast message
    const totalAdded = cartData[itemId][size];
    toast(`🛒 You've added ${totalAdded} ${totalAdded === 1 ? "item" : "items"} to the cart`);

    const userId = localStorage.getItem("userId");
    if (token && userId) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { userId, itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Add to cart error:", err.response?.data || err.message);
        toast.error("Failed to add to cart");
      }
    }
  };

  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const sizeMap = cartItems[itemId];
      for (const size in sizeMap) {
        total += sizeMap[size];
      }
    }
    return total;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    quantity = Math.max(0, Math.min(5, Number(quantity)));
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);

    const userId = localStorage.getItem("userId");
    if (token && userId) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { userId, itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Update cart error:", err.response?.data || err.message);
        toast.error("Failed to update cart");
      }
    }
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = products.find((p) => p._id === itemId);
      if (!item) continue;
      for (const size in cartItems[itemId]) {
        total += item.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  // ----------------- PRODUCTS -----------------
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) setProducts(res.data.products);
    } catch (err) {
      toast.error(err.message);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);

  // ----------------- AUTH -----------------
  const login = (newToken, userId) => {
    if (!newToken || !userId) return;
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userId); // ✅ save userId
  };

  const logout = () => {
    setToken("");
    setCartItems({});
    setWishlistItems([]);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishlistItems");
    toast("👋 Logged out successfully!", toastOptions());
    navigate("/");
  };

  const toastOptions = () => ({
    style: {
      backgroundColor: "white",
      color: "black",
      fontWeight: "bold",
      borderRadius: "0px",
      fontFamily: '"Indie Flower", cursive',
    },
    progressStyle: { background: "black" },
  });

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken: login,
    token,
    login,
    logout,
    wishlistItems,
    setWishlistItems,
    toggleWishlist,
    isInWishlist,
    getWishlistCount,
    fetchWishlistFromServer,
    syncLocalWishlistToServer,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
