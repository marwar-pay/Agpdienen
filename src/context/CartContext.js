
import { apiDelete, apiGet, apiPost, apiPut } from "@/api/apiMethods";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create Context
const CartContext = createContext();

// Custom Hook for using Cart Context
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [buyNowProduct, setBuyNowProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cartitems, setCatitems] = useState([]);

  const getCartItems = async () => {
    const token = localStorage.getItem("accessToken");
    if(!token){
      return;
    }
    try {
      const response = await apiGet("api/cart");
      console.log(response)
      if (response.status === 200) {
        setCatitems(response.data?.cart);
      } else {
        toast.error(response.data.message || "Failed to fetch cart items");
        setCatitems(null)
      }
    } catch (error) {
      // console.log("Error fetching cart items:", error);
      // toast.error("Something went wrong. Please try again.");
      setCatitems(null)
    }
  };

  useEffect(() => {
      getCartItems();
  }, []); 
  // Load cart and wishlist from localStorage if available
  useEffect(() => {
    // const savedCart = JSON.parse(localStorage.getItem("cart"));
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));

    // if (savedCart) setCart(savedCart);
    if (savedWishlist) setWishlist(savedWishlist);
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [cart, wishlist]);

  // Add to Cart Function
  // const addToCart = (product) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((item) => item._id === product._id);
  //     if (existingItem) {
  //       return prevCart.map((item) =>
  //         item._id === product._id ? { ...item, qty: item.qty + 1 } : item
  //       );
  //     }
  //     return [...prevCart, { ...product, qty: 1 }];
  //   });
  // };

  const addToCart = async (product) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Login First");
      return;
    }
    try {
      const response = await apiPost("api/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      if (response.status === 200) {
        toast.success(response.data.message || "Product added to cart!");
        getCartItems(); // Refresh cart from API
      } else {
        toast.error(response.data.message || "Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const removeFromCart = async (_id) => {
    try {
      const response = await apiPost(`api/cart/remove`,{productId:_id});
      if (response.status === 200) {
        toast.success(response.data.message || "Product removed from cart");
        getCartItems(); // Refresh cart from API
      } else {
        toast.error(response.data.message || "Failed to remove product from cart");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Update Quantity
  const updateQuantity = async (id, quantity) => {
    console.log(id,quantity)
    try {
      const response = await apiPost("api/cart/update", { productId: id, quantity: quantity });
      if (response.status === 200) {
        toast.success(response.data.message || "Cart updated successfully");
        getCartItems(); // Refresh cart from API
      } else {
        toast.error(response.data.message || "Failed to update cart");
      }
    } catch (error) {
      // console.error("Error updating cart:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Set Product for Buy Now
  const setBuyNow = (product, qty = 1) => {
    setBuyNowProduct({ ...product, qty });
  };

  // Remove Item from Cart
  const removeFromCarts = (id) => {
   
    if (buyNowProduct && buyNowProduct._id === id) {
      setBuyNowProduct(null);
    }
  };

  // Update Quantity
  const updateQuantitys = (id, qty) => {
   
    if (buyNowProduct && buyNowProduct._id === id) {
      setBuyNowProduct({ ...buyNowProduct, qty: Math.max(1, qty) });
    }
  };

  // Total Price for Cart
  const totalPrice = cart.reduce((acc, item) => acc + item.actualPrice * item.qty, 0);

  // Wishlist Management
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item._id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartitems,
        cart,
        addToCart,
        setBuyNow,
        buyNowProduct,
        removeFromCart,
        updateQuantity,
        removeFromCarts,
        updateQuantitys,
        totalPrice,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
