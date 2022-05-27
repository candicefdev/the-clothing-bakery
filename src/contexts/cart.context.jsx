import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains productToAdd
  const exsistingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  //if found, incremenet quantity
  if (exsistingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //return new array with modified cartItems/ new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartItemCount(count);
  }, [cartItems]);

  const addItemToCart = (product) =>
    setCartItems(addCartItem(cartItems, product));

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
