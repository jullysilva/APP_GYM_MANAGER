/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Application from "../Application";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("Application Component", () => {
  it("should render Application component", () => {
    const { getByText, getByTestId } = render(
      <Router>
        <Application />
      </Router>
    );

    // Verifica se os elementos iniciais estão presentes
    expect(getByText("Bem-vindo de volta!")).toBeInTheDocument();
    expect(getByText("Olá, Gerente!")).toBeInTheDocument();
    expect(getByTestId("signIn")).toBeInTheDocument();
    expect(getByTestId("signUp")).toBeInTheDocument();
  });

  it.skip("should render a Toatify after click register", async () => {
    const { getByText } = render(
      <Router>
        <Application />
      </Router>
    );

    const submitButton = getByText("Registrar-se");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Registro realizado com sucesso, volte para login!"
      );
    });
  });

  it("should switch to Sign Up panel", () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <Router>
        <Application />
      </Router>
    );

    // Verifica se a troca para o painel de registro está funcionando
    const signUpButton = getByTestId("signUp");
    fireEvent.click(signUpButton);

    expect(getByText("Inscrever-se")).toBeInTheDocument();
    expect(getByPlaceholderText(/Código de ativação/i)).toBeInTheDocument();
    expect(getByPlaceholderText("Repetir senha")).toBeInTheDocument();
  });

  it("should switch to Sign In panel", () => {
    const {
      getByTestId,
      getByText,
      queryByLabelText,
      getByPlaceholderText,
      getAllByText,
    } = render(
      <Router>
        <Application />
      </Router>
    );

    const signInButton = getByTestId("signIn");
    fireEvent.click(signInButton);

    expect(getByTestId("signIn")).toHaveTextContent(/Entrar/i);

    expect(getByTestId("sign-in-container")).toHaveTextContent(
      /Esqueceu a senha/i
    );
  });
});
