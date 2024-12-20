/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import NavBar from "../NavBar";

describe("NavBar", () => {
  it("renders welcome message and account icon", () => {
    const { getByText, getByTestId } = render(
      <Router>
        <NavBar
          handleMenuToggle={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    expect(getByText(/Gerente/i)).toBeInTheDocument();

    // Use data-testid for targeted testing of the icon
    expect(getByTestId("account-icon")).toBeInTheDocument();
  });
});
