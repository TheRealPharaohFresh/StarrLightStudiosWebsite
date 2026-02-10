import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CheckoutPage from "../../pages/CheckoutPage";
import { renderWithProviders } from "../test-utils";

describe("CheckoutPage", () => {
  it("shows empty state when cart is empty", () => {
    renderWithProviders(<CheckoutPage />, { preloadedState: { cart: { items: [] } } });

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to services/i })).toBeInTheDocument();
  });

  it("renders bookings and total when cart has items", () => {
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

    renderWithProviders(<CheckoutPage />, { preloadedState, route: "/checkout" });

    expect(screen.getByText("Your Bookings")).toBeInTheDocument();
    expect(screen.getByText("Bronze Package")).toBeInTheDocument();
    expect(screen.getAllByText("$100.00")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /confirm booking/i })).toBeInTheDocument();
  });
});
