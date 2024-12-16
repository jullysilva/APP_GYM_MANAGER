/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Register";
import { toast } from "react-toastify";
import "@testing-library/jest-dom/extend-expect";

// Mock da função toast para evitar exibir notificações durante os testes
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

describe("Register Component", () => {
  it("should render Register component", () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    expect(getByPlaceholderText("Código de ativação")).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(getByPlaceholderText("Repetir senha")).toBeInTheDocument();
    expect(getByText("Registrar-se")).toBeInTheDocument();
  });

  it("should submit the form with user input", async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    const codeInput = getByPlaceholderText("Código de ativação");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Senha");
    const repeatPasswordInput = getByPlaceholderText("Repetir senha");
    const submitButton = getByText("Registrar-se");

    fireEvent.change(codeInput, { target: { value: "123456" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Registro realizado com sucesso, volte para login!"
      );
    });
  });
});
