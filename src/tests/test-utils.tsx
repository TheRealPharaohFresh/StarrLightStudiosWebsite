import { type ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import cartReducer, { type Booking } from "../redux/cartSlice";

interface RenderOptions {
  preloadedState?: { cart: { items: Booking[] } };
  route?: string;
}

export const createTestStore = (preloadedState?: { cart: { items: Booking[] } }) =>
  configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

export const renderWithProviders = (
  ui: ReactElement,
  { preloadedState, route = "/" }: RenderOptions = {}
) => {
  const store = createTestStore(preloadedState);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
  };
};
