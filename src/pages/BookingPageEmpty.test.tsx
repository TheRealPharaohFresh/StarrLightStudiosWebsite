import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookingPage from "./BookingPage";
import { renderWithProviders } from "../test-utils";

vi.mock("../services/bookingServices", () => ({
  services: [],
}));

describe("BookingPage empty state", () => {
  it("shows a no services message", () => {
    renderWithProviders(<BookingPage />, { route: "/booking" });

    expect(screen.getByText(/no services available/i)).toBeInTheDocument();
  });
});
