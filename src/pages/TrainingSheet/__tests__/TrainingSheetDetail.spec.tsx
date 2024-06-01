/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-wait-for-side-effects */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrainingSheetDetail from "../TrainingSheetDetail";

const mockSheet = {
  titulo: "Treino A",
  observacao: "Nenhuma",
  categoria: "Categoria A",
  exercicios: [
    {
      id: 1,
      name: "Agachamento Livre",
      category: "Pernas",
      equipamento: "Barra",
      serie: 3,
      nRepeticao: 12,
      intervalo: 60,
    },
  ],
};

describe("TrainingSheetDetail Component", () => {
  it("should render the TrainingSheetDetail component with correct data", () => {
    render(
      <TrainingSheetDetail sheet={mockSheet} open={true} setOpen={() => {}} />
    );

    // Verifica se os campos do formulário são preenchidos corretamente
    expect(screen.getByLabelText("Título")).toHaveValue("Treino A");
    expect(screen.getByLabelText("Observação")).toHaveValue("Nenhuma");
    expect(screen.getByLabelText("Exercícios")).toHaveValue(
      "Selecione um exercício"
    );
    // expect(screen.getByLabelText("Categoria")).toHaveValue("Categoria A");

    // Verifica se os detalhes do exercício são exibidos corretamente na tabela
    expect(screen.getAllByText("Agachamento Livre")[0]).toBeInTheDocument();
    expect(screen.getByText("Pernas")).toBeInTheDocument();
    expect(screen.getByText("Barra")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
  });

  it("should update the training sheet when the form is submitted", async () => {
    const mockSetOpen = jest.fn();
    const { getByLabelText, getByTestId } = render(
      <TrainingSheetDetail
        sheet={mockSheet}
        open={true}
        setOpen={mockSetOpen}
      />
    );

    fireEvent.click(screen.getByTestId("icon-edit"));

    // Simula a atualização do título e da observação
    fireEvent.change(getByLabelText("Título"), {
      target: { value: "Novo Treino" },
    });
    fireEvent.change(getByLabelText("Observação"), {
      target: { value: "Nova Observação" },
    });

    // Simula o envio do formulário
    fireEvent.click(getByTestId("button-update"));

    // Verifica se a função setOpen foi chamada para fechar o modal
    await waitFor(() => {
      expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
  });
});
