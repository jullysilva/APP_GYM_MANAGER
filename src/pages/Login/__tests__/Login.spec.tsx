/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { userHook } from "../../../Utils/Context/useAuth";
import Login from "../Login";
import "@testing-library/jest-dom/extend-expect";

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock the userHook
jest.mock("Utils/Context/useAuth", () => ({
  userHook: jest.fn(),
}));

describe("Login Component", () => {
  const mockNavigate = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (userHook as jest.Mock).mockReturnValue({ setUser: mockSetUser });
  });

  it("should render Login component", () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(getByText("Entrar")).toBeInTheDocument();
    expect(getByText("Esqueceu a senha?")).toBeInTheDocument();
  });

  it("should submit the form with user input", async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
    const submitButton = getByText("Acessar");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/painel");
    });
  });
});
