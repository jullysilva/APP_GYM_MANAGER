import { screen, render } from "@testing-library/react";
import Sidebar from "../Sidebar";
import React from "react";

it("renders Sidebar component", () => {
  const { getByText } = render(<Sidebar menuOpen={true} />);

  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Finanças/i)).toBeInTheDocument();
  expect(screen.getByText(/Alunos/i)).toBeInTheDocument();
  expect(screen.getByText(/Treinadores/i)).toBeInTheDocument();
  expect(screen.getByText(/Exercício/i)).toBeInTheDocument();
  expect(screen.getByText(/Fichas de treino/i)).toBeInTheDocument();
});
