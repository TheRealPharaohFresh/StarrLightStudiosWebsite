import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import BookingPage from "../../pages/BookingPage";
import { renderWithProviders } from "../test-utils";

describe("BookingPage", () => {
  it("renders services and adds to cart", async () => {
    const user = userEvent.setup();
    const { store } = renderWithProviders(<BookingPage />, { route: "/booking" });

    expect(screen.getByText(/book your session/i)).toBeInTheDocument();

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    await user.click(addButtons[0]);

    expect(store.getState().cart.items).toHaveLength(1);
  });
});
