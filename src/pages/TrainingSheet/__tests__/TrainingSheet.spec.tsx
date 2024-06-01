/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrainingSheet from "../TrainingSheet"; // Atualize o caminho conforme necessário

// Mock do ExerciseMock
jest.mock("../../../mocks", () => ({
  ExerciseMock: [
    {
      id: 1,
      name: "Agachamento Livre",
      category: "Pernas",
      equipamento: "Barra",
      serie: 3,
      nRepeticao: 12,
      intervalo: 60,
    },
    {
      id: 2,
      name: "Supino Reto",
      category: "Peitoral",
      equipamento: "Banco de Supino",
      serie: 4,
      nRepeticao: 10,
      intervalo: 45,
    },
  ],
}));

describe("TrainingSheet Component", () => {
  it("should open and close the modal when the buttons are clicked", () => {
    render(<TrainingSheet />);

    // Verifica se o modal não está aberto inicialmente
    expect(screen.queryByText("Criar Ficha de treino")).not.toBeInTheDocument();

    // Clica no botão para abrir o modal
    fireEvent.click(screen.getByTestId("button-create"));

    // Verifica se o modal foi aberto
    expect(screen.getByText("Criar Ficha de treino")).toBeInTheDocument();

    // Clica no botão para fechar o modal
    fireEvent.click(screen.getByText("Fechar"));

    // Verifica se o modal foi fechado
    expect(screen.queryByText("Criar Ficha de treino")).not.toBeInTheDocument();
  });

  it("should add a new training sheet when the form is submitted", async () => {
    const { getByLabelText, getByText } = render(<TrainingSheet />);

    fireEvent.click(getByText("Criar Ficha"));

    fireEvent.change(getByLabelText("Título"), {
      target: { value: "Treino A" },
    });
    fireEvent.change(getByLabelText("Categoria"), {
      target: { value: "Categoria A" },
    });
    fireEvent.change(getByLabelText("Observação"), {
      target: { value: "Nenhuma" },
    });

    fireEvent.click(screen.getByTestId("button-save"));

    // Verifica se a nova ficha foi adicionada
    await waitFor(() => {
      expect(screen.getByText("Treino A")).toBeInTheDocument();
    });
  });

  it("should show details of a training sheet when 'Veja mais' button is clicked", async () => {
    render(<TrainingSheet />);

    fireEvent.click(screen.getByText("Criar Ficha"));

    fireEvent.change(screen.getByLabelText("Título"), {
      target: { value: "Treino A" },
    });
    fireEvent.change(screen.getByLabelText("Categoria"), {
      target: { value: "Categoria A" },
    });
    fireEvent.change(screen.getByLabelText("Observação"), {
      target: { value: "Nenhuma" },
    });

    fireEvent.click(screen.getByText("Salvar"));

    // Clica no botão 'Veja mais'

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("button-veja-mais"));
      // Verifica se os detalhes da ficha são exibidos
    });
    expect(screen.getByText("Treino A")).toBeInTheDocument();
    expect(screen.getByText("Nenhuma")).toBeInTheDocument();
  });
});
