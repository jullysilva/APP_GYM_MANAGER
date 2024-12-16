/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Application from "../Application";

// Mocking Login and Register components
jest.mock("../../Login/Login", () => () => (
  <div data-testid="login-component">Login Component</div>
));
jest.mock("../../Register/Register", () => () => (
  <div data-testid="register-component">Register Component</div>
));

describe("Application Component", () => {
  it("should render Login and Register components", () => {
    const { getByTestId, getByText } = render(<Application />);

    expect(getByTestId("login-component")).toBeInTheDocument();
    expect(getByTestId("register-component")).toBeInTheDocument();
    expect(getByText("Bem-vindo de volta!")).toBeInTheDocument();
    expect(getByText("Olá, Gerente!")).toBeInTheDocument();
  });

  it("should switch to register view when Sign Up button is clicked", () => {
    const { getByTestId, container } = render(<Application />);

    const signUpButton = getByTestId("signUp");
    fireEvent.click(signUpButton);

    expect(container.querySelector(".container")).toHaveClass(
      "right-panel-active"
    );
  });

  it("should switch to login view when Sign In button is clicked", () => {
    const { getByTestId, container } = render(<Application />);

    const signInButton = getByTestId("signIn");
    fireEvent.click(signInButton);

    expect(container.querySelector(".container")).not.toHaveClass(
      "right-panel-active"
    );
  });
});
