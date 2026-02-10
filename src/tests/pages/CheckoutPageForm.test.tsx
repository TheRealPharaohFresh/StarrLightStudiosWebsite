import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CheckoutPage from "../../pages/CheckoutPage";
import { renderWithProviders } from "../test-utils";

describe("CheckoutPage form", () => {
  it("shows form fields when there are items", () => {
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

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });
});
