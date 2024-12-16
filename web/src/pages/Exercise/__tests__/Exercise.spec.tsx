/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Exercises from "../Exercise";
import {
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../../../services/Requests/ExercisesService";
import { IExercise } from "../../../Utils/Interfaces/Interface";

// Mock the services
jest.mock("../../../services/Requests/ExercisesService");
jest.mock("axios");

const mockExercises: IExercise[] = [
  {
    id: "1",
    name: "Corrida",
    category: "Leg",
    equipament: "Esteira",
    serie: 3,
    num_rep: 10,
    interval: 60,
  },
];

describe("Exercises Component", () => {
  beforeEach(() => {
    (getAllExercises as jest.Mock).mockResolvedValue(mockExercises);
    (createExercise as jest.Mock).mockResolvedValue({});
    (updateExercise as jest.Mock).mockResolvedValue({});
    (deleteExercise as jest.Mock).mockResolvedValue({});
  });

  it("should render exercises table", async () => {
    render(<Exercises />);
    expect(screen.getByText("Exercícios")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Corrida")).toBeInTheDocument();
      expect(screen.getByText("Leg")).toBeInTheDocument();
      expect(screen.getByText("Esteira")).toBeInTheDocument();
    });
  });

  it("should open modal to add exercise", async () => {
    render(<Exercises />);

    fireEvent.click(screen.getByRole("button", { name: /plus/i }));

    expect(screen.getByText("Adicionar Exercício")).toBeInTheDocument();
  });

  it("should open modal to edit exercise", async () => {
    render(<Exercises />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("edit-exercise"));
    });

    expect(screen.getByText("Editar Exercício")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Corrida")).toBeInTheDocument();
  });

  it("should add a new exercise", async () => {
    render(<Exercises />);

    fireEvent.click(screen.getByTestId("add-exercise"));

    fireEvent.change(screen.getByPlaceholderText("Nome do exercício"), {
      target: { value: "Novo Exercício" },
    });

    fireEvent.change(screen.getByPlaceholderText("Ex.: Esteira, Escada, ..."), {
      target: { value: "Equipamento" },
    });

    fireEvent.change(screen.getByPlaceholderText("Quantidade de séries"), {
      target: { value: 3 },
    });

    fireEvent.change(screen.getByPlaceholderText("Repetições"), {
      target: { value: 10 },
    });

    fireEvent.change(screen.getByPlaceholderText("Intervalo em segundos"), {
      target: { value: 60 },
    });

    fireEvent.click(screen.getByTestId("button-add"));

    await waitFor(() => {
      expect(createExercise).toHaveBeenCalled();
    });
  });

  it("should delete an exercise", async () => {
    render(<Exercises />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("delete-exercise"));
    });

    await waitFor(() => {
      expect(deleteExercise).toHaveBeenCalledWith("1");
    });
  });
});
