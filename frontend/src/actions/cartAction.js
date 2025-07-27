
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../constants/cartConstants";

export const addToCart = (item) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems;
  
  // Check if item already exists in cart
  const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);

  if (existingItem) {
    
  // Update quantity if item exists
  const updatedCart = cartItems.map((cartItem) =>
    cartItem._id === item._id
      ? { ...cartItem, quantity: Math.max(1, item.quantity) }
      : cartItem
  );

    dispatch({
      type: ADD_TO_CART,
      payload: updatedCart,
    });
  } else {
    // Add new item
    dispatch({
      type: ADD_TO_CART,
      payload: [...cartItems, { ...item, quantity: 1 }],
    });
  }

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  const updatedCart = getState().cart.cartItems.filter((item) => item._id !== id);

  dispatch({
    type: REMOVE_FROM_CART,
    payload: updatedCart,
  });

  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });

  localStorage.removeItem("cartItems");
};

  