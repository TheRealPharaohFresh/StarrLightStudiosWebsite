import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ShoppingCartPage from "./ShoppingCartPage";
import { renderWithProviders } from "../test-utils";

describe("ShoppingCartPage", () => {
  it("renders items and removes them", async () => {
    const user = userEvent.setup();
    const preloadedState = {
      cart: {
        items: [
          {
            id: "bronze",
            title: "Bronze Package",
            description: "Test description",
            price: 100,
            imageUrl: "https://example.com/bronze.png",
          },
        ],
      },
    };

    renderWithProviders(<ShoppingCartPage />, { preloadedState, route: "/cart" });

    expect(screen.getByText("Bronze Package")).toBeInTheDocument();
    expect(screen.getAllByText("$100.00")).toHaveLength(3);

    await user.click(screen.getByRole("button", { name: /remove/i }));
    expect(screen.queryByText("Bronze Package")).not.toBeInTheDocument();
  });

  it("shows an empty state when there are no items", () => {
    renderWithProviders(<ShoppingCartPage />, { preloadedState: { cart: { items: [] } } });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view services/i })).toBeInTheDocument();
  });
});
