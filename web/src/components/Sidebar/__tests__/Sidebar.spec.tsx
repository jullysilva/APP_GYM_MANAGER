/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import Sidebar from "../Sidebar";
import { BrowserRouter as Router } from "react-router-dom";

describe("Sidebar Component", () => {
  it("renders sidebar links correctly", () => {
    const { getByText } = render(
      <Router>
        <Sidebar menuOpen={true} />
      </Router>
    );

    expect(getByText("Dashboard")).toBeInTheDocument();
    expect(getByText("Alunos")).toBeInTheDocument();
    expect(getByText("Exercício")).toBeInTheDocument();
    expect(getByText("Fichas de treino")).toBeInTheDocument();
  });
});
