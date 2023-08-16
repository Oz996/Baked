import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    incrementQuantity(state, action) {
      const itemInCart = state.cartItems.find(
        (item) => item.id == action.payload.id
      );
      itemInCart.quantity++;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementQuantity(state, action) {
      const itemInCart = state.cartItems.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart.quantity == 1) {
        const removeFromCart = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = removeFromCart;
      } else {
        itemInCart.quantity--;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const itemInCart = state.cartItems.find(
        (item) => item.id == action.payload.id
      );
      if (itemInCart) {
        const removeFromCart = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = removeFromCart
      }
    },
  },
});

export const { addToCart, clearCart, incrementQuantity, decrementQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
