/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Exercise from "../Exercise";
import { ExerciseMock } from "../../../mocks";
import { columnsExercise } from "../Exercise";

// Mock de Table
jest.mock("components/Table/Table", () => (props: any) => {
  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((column: any) => (
            <th key={column.field}>{column.headerName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.map((row: any, rowIndex: number) => (
          <tr key={rowIndex}>
            {props.columns.map((column: any, colIndex: number) => (
              <td key={colIndex}>{row[column.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

describe("Exercise Component", () => {
  it("should render the Exercise component with the correct columns and data", () => {
    render(<Exercise />);

    // Verificar se o título é renderizado
    expect(screen.getByText("Exercícios")).toBeInTheDocument();

    // Verificar se as colunas são renderizadas corretamente
    columnsExercise.forEach((column) => {
      expect(screen.getByText(column.headerName)).toBeInTheDocument();
    });

    // Verificar se os dados são renderizados corretamente
    ExerciseMock.forEach((exercise) => {
      expect(screen.getAllByText(exercise.name)[0]).toBeInTheDocument();
      expect(screen.getAllByText(exercise.category)[0]).toBeInTheDocument();
      expect(screen.getAllByText(exercise.equipamento)[0]).toBeInTheDocument();
    });
  });
});
