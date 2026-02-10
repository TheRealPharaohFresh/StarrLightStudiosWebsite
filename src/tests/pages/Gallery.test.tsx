import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Gallery from "../../pages/Gallery";
import { renderWithProviders } from "../test-utils";

describe("Gallery", () => {
  it("renders the gallery heading and images", () => {
    renderWithProviders(<Gallery />, { route: "/gallery" });

    expect(screen.getByText(/photo gallery/i)).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
  });
});
