/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../NotFound";

describe("NotFound component", () => {
  it("renders without crashing", () => {
    render(<NotFound />);
  });

  it("renders the correct text", () => {
    const { getByText } = render(<NotFound />);
    const textElement = getByText(
      /Desculpe, a página que você está procurando não foi encontrada./i
    );
    expect(textElement).toBeInTheDocument();
  });

  it("renders the Login link", () => {
    const { getByText } = render(<NotFound />);
    const linkElement = getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders the visual element", () => {
    const { getByTestId } = render(<NotFound />);
    const visualElement = getByTestId("visual");
    expect(visualElement).toBeInTheDocument();
  });
});
