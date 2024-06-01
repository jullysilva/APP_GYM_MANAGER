/* eslint-disable testing-library/prefer-screen-queries */
// ResetPassword.test.tsx
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetPassword from "../ResetPassword";
import * as ReactHookForm from "react-hook-form";

// Mock da função handleSubmit para evitar erros de submissão real do formulário
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: (fn: any) => fn,
    formState: { errors: {} },
  }),
}));

describe("ResetPassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render ResetPassword component", () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <ResetPassword />
    );
    expect(
      getByText(
        "Por favor, insira o endereço de e-mail que você usou para se registrar e enviaremos um link para redefinir sua senha por e-mail."
      )
    ).toBeInTheDocument();
    expect(getByPlaceholderText("Email")).toBeInTheDocument();
    expect(getByTestId("reset")).toBeInTheDocument();
    expect(getByText(/Voltar para/i)).toBeInTheDocument();
  });

  it("should update email input value", () => {
    const { getByPlaceholderText } = render(<ResetPassword />);
    const emailInput = getByPlaceholderText("Email") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");
  });

  it.skip("should submit the form with email value", async () => {
    const onSubmitMock = jest.fn();

    (ReactHookForm.useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: (fn: any) => async (e: React.FormEvent) => {
        e.preventDefault();
        await fn({ email: "test@example.com" });
      },
      formState: { errors: {} },
    });

    const { getByPlaceholderText, getByTestId } = render(<ResetPassword />);

    const emailInput = getByPlaceholderText("Email") as HTMLInputElement;
    const form = getByTestId("reset-form");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith({ email: "test@example.com" });
    });
  });
});
