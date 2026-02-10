import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LandingPage from "./LandingPage";
import { renderWithProviders } from "../test-utils";

describe("LandingPage", () => {
  it("renders the about section", () => {
    renderWithProviders(<LandingPage />, { route: "/home" });

    expect(screen.getByText(/about starr light studios/i)).toBeInTheDocument();
  });
});
