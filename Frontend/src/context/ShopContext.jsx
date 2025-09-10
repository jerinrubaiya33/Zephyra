import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../index.css';

export const ShopContext = createContext({
  setShowSearch: () => {},
  getCartCount: () => 0,
  getWishlistCount: () => 0,
});

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlistItems');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlistItems((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('wishlistItems', JSON.stringify(updated));
      return updated;
    });
  };

  const isInWishlist = (productId) => wishlistItems.includes(productId);
  const getWishlistCount = () => wishlistItems.length;

  // Cart logic (unchanged)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : {};
    } catch (error) {
      console.error('Error parsing cart items', error);
      return {};
    }
  });

  useEffect(() => {
    const cleanedCart = {};
    for (const itemId in cartItems) {
      const sizeMap = cartItems[itemId];
      const validSizes = {};
      for (const size in sizeMap) {
        if (sizeMap[size] > 0) {
          validSizes[size] = sizeMap[size];
        }
      }
      if (Object.keys(validSizes).length > 0) {
        cleanedCart[itemId] = validSizes;
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(cleanedCart));
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast('⚠️ Select Product Size', toastOptions());
      return;
    }

    let cartData = structuredClone(cartItems);
    const currentQty = cartData[itemId]?.[size] || 0;

    if (currentQty >= 5) {
      toast('⚠️ Maximum quantity (5) reached for this item', toastOptions());
      return;
    }

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    if (currentQty === 0) {
      toast('🛍️ Product added to the cart!', toastOptions());
    } else {
      toast(`🛍️ Quantity increased to ${currentQty + 1}`, toastOptions());
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      const sizeMap = cartItems[itemId];
      if (typeof sizeMap === 'object' && sizeMap !== null) {
        for (const size in sizeMap) {
          const qty = sizeMap[size];
          if (typeof qty === 'number' && qty > 0) {
            totalCount += qty;
          }
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    quantity = Math.max(0, Math.min(5, Number(quantity)));

    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue;

      const sizeMap = cartItems[itemId];
      for (const size in sizeMap) {
        const qty = sizeMap[size];
        if (qty > 0) {
          totalAmount += itemInfo.price * qty;
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const toastOptions = () => ({
    style: {
      backgroundColor: 'white',
      color: 'black',
      fontWeight: 'bold',
      borderRadius: '0px',
      fontFamily: '"Indie Flower", cursive',
    },
    progressStyle: {
      background: 'black',
    },
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
    setToken,
    token,

    // Wishlist-related
    wishlistItems,
    setWishlistItems,
    toggleWishlist,
    isInWishlist,
    getWishlistCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;