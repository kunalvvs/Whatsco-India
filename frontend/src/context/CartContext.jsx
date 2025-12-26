import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Initialize wallet from localStorage
  const [wallet, setWallet] = useState(() => {
    const savedWallet = localStorage.getItem('wallet');
    return savedWallet ? JSON.parse(savedWallet) : {
      balance: 5000, // Default balance
      transactions: []
    };
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save wallet to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wallet', JSON.stringify(wallet));
  }, [wallet]);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart item count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Add wallet transaction
  const addWalletTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...transaction
    };
    
    setWallet(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions]
    }));
  };

  // Update wallet balance
  const updateWalletBalance = (newBalance) => {
    setWallet(prev => ({
      ...prev,
      balance: newBalance
    }));
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    wallet,
    addWalletTransaction,
    updateWalletBalance
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
