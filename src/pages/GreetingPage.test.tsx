import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GreetingPage from "./GreetingPage";
import { renderWithProviders } from "../test-utils";

describe("GreetingPage", () => {
  it("renders the welcome message", () => {
    vi.useFakeTimers();
    renderWithProviders(<GreetingPage />, { route: "/" });

    expect(screen.getByText(/welcome to starrlight studios/i)).toBeInTheDocument();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });
});
