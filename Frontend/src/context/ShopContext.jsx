import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import '../index.css';

// export const ShopContext = createContext();
export const ShopContext = createContext({
  setShowSearch: () => { },
  getCartCount: () => 0,
  // Add all other default values here
});

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const navigate = useNavigate()

  // Initialize cartItems from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : {};
    } catch (error) {
      console.error('Error parsing cart items', error);
      return {};
    }
  });

  // Clean cartItems before saving
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
      toast('⚠️ Select Product Size', {
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
      return;
    }

    let cartData = structuredClone(cartItems);
    const currentQty = cartData[itemId]?.[size] || 0;

    // Enforce 5-item limit
    if (currentQty >= 5) {
      toast('⚠️ Maximum quantity (5) reached for this item', {
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
      return;
    }

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
    //if we are login our database also update what we have in our cart
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }

    // Show different messages for new item vs quantity increase
    if (currentQty === 0) {
      toast('🛍️ Product added to the cart!', {
        style: {
          backgroundColor: 'white',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '0px',
          fontFamily: '"Indie Flower", cursive',
        },
        progressStyle: {
          background: '#000',
        },
      });
    } else {
      toast(`🛍️ Quantity increased to ${currentQty + 1}`, {
        style: {
          backgroundColor: 'white',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '0px',
          fontFamily: '"Indie Flower", cursive',
        },
        progressStyle: {
          background: '#000',
        },
      });
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
    // Ensure quantity is a number between 0 and 5
    quantity = Math.max(0, Math.min(5, Number(quantity)));

    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      // Remove the size entry if quantity is 0
      delete cartData[itemId][size];
      // Remove the item entry if no sizes left
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
    //update quantity from cart page in database
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  }

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

  //Backend fetch product
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductsData()
  }, [])

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

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
    token
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;