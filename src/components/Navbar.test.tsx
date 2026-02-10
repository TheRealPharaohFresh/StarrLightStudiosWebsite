import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NavBar from "./Navbar";
import { renderWithProviders } from "../test-utils";

vi.mock("./DisplayData", () => ({
  useCurrentUser: () => null,
}));

describe("NavBar", () => {
  it("shows cart count", () => {
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

    renderWithProviders(<NavBar />, { preloadedState });

    expect(screen.getByText(/cart \(1\)/i)).toBeInTheDocument();
  });
});
