import { describe, it, expect } from "vitest";
import cartReducer, { addToCart, removeFromCart, clearCart, type Booking } from "./cartSlice";

describe("cartSlice", () => {
  const item: Booking = {
    id: "bronze",
    title: "Bronze Package",
    description: "Test description",
    price: 100,
    imageUrl: "https://example.com/bronze.png",
  };

  it("adds items and prevents duplicates", () => {
    const stateAfterAdd = cartReducer({ items: [] }, addToCart(item));
    expect(stateAfterAdd.items).toHaveLength(1);

    const stateAfterDuplicate = cartReducer(stateAfterAdd, addToCart(item));
    expect(stateAfterDuplicate.items).toHaveLength(1);
  });

  it("removes items by id", () => {
    const state = { items: [item] };
    const nextState = cartReducer(state, removeFromCart("bronze"));
    expect(nextState.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    const state = { items: [item] };
    const nextState = cartReducer(state, clearCart());
    expect(nextState.items).toHaveLength(0);
  });
});
