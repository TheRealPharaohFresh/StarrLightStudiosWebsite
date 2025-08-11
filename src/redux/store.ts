import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { setCart } from "./cartSlice";
import type { Booking } from "./cartSlice";

const loadCartFromSession = (): Booking[] => {
  try {
    const stored = sessionStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load cart from sessionStorage", e);
    return [];
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Initialize cart state from sessionStorage after store creation
const initialCart = loadCartFromSession();
if (initialCart.length > 0) {
  store.dispatch(setCart(initialCart));
}

// Subscribe to store changes to persist cart to sessionStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    sessionStorage.setItem("cart", JSON.stringify(state.cart.items));
  } catch (error) {
    console.error("Failed to save cart to sessionStorage", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;