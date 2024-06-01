/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Profile from "../Profile";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        logradouro: "Rua Teste",
        bairro: "Bairro Teste",
        localidade: "Cidade Teste",
        uf: "UF Teste",
        complemento: "Complemento Teste",
      },
    })
  ),
}));

describe("Profile Component", () => {
  beforeEach(() => {
    render(<Profile />);
  });

  it("renders profile components correctly", () => {
    expect(screen.getByLabelText("Academia")).toBeInTheDocument();
    expect(screen.getByText("Idade")).toBeInTheDocument();
    expect(screen.getByText("Cargo")).toBeInTheDocument();
    expect(screen.getByText("Administradores")).toBeInTheDocument();
  });

  it("opens and closes the AdmManager modal", async () => {
    const addButton = screen.getByTestId("add-manager");
    fireEvent.click(addButton);

    expect(screen.getByRole("presentation")).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText("João Souza da Silva");
    const emailInput = screen.getByPlaceholderText("joão@example.com");
    fireEvent.change(nameInput, { target: { value: "New Admin" } });
    fireEvent.change(emailInput, { target: { value: "newadmin@example.com" } });

    // Verifica se o modal permanece aberto após o preenchimento dos dados
    expect(screen.getByRole("presentation")).toBeInTheDocument();

    // Simula o clique no botão de salvar
    const saveButton = screen.getByTestId("button-save");
    fireEvent.click(saveButton);

    // Aguarda até que o modal seja fechado
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("edits the gym profile", async () => {
    const editButton = screen.getByTestId("edit-profile-gym");
    fireEvent.click(editButton);

    const gymNameInput = screen.getByPlaceholderText("Nome da academia");
    fireEvent.change(gymNameInput, { target: { value: "New Gym Name" } });
    expect(gymNameInput).toHaveValue("New Gym Name");

    const updateButton = screen.getByTestId("button-update-gym");
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByTestId("edit-profile-gym")).toBeInTheDocument();
    });
    expect(gymNameInput).toHaveValue("New Gym Name");
  });

  it("adds a new admin", async () => {
    const addButton = screen.getByTestId("add-manager");
    fireEvent.click(addButton);

    const nameInput = screen.getByPlaceholderText("João Souza da Silva");
    const emailInput = screen.getByPlaceholderText("joão@example.com");
    const saveButton = screen.getByTestId("button-save");

    fireEvent.change(nameInput, { target: { value: "New Admin" } });
    fireEvent.change(emailInput, { target: { value: "newadmin@example.com" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("New Admin")).toBeInTheDocument();
    });
    expect(screen.getByText("newadmin@example.com")).toBeInTheDocument();
  });

  it("deletes an admin", async () => {
    const deleteButton = screen.getAllByTestId("delete-manager")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("Admin Name")).not.toBeInTheDocument();
    });
  });
});
