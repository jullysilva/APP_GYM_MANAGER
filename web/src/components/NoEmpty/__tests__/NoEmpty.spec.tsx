import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoEmpty from "../NoEmpy";

describe("NoEmpty Component", () => {
  it("renders the component with the correct text", () => {
    const text = "No data available";
    render(<NoEmpty text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("renders the image with the correct alt text", () => {
    const text = "No data available";
    render(<NoEmpty text={text} />);

    const image = screen.getByAltText("Sem dados");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("h-25 w-25");
  });
});
