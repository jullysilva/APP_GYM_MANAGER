import React from "react";
import { render } from "@testing-library/react-native";
import Card from "../../src/screens/app/InfoTreino/components/card";

const exercise = {
  id: 1,
  name: "Agachamento Livre",
  category: "Pernas",
  equipment: "Barra",
  series: 3,
  repetitions: 12,
  interval: 60,
};

describe("Card component", () => {
  test("renders exercise information correctly", () => {
    const { getByText } = render(<Card {...exercise} />);

    expect(getByText("Agachamento Livre")).toBeDefined();
    expect(getByText("Categoria: Pernas")).toBeDefined();
    expect(getByText("Equipamento: Barra")).toBeDefined();
    expect(getByText("Séries: 3")).toBeDefined();
    expect(getByText("Repetições: 12")).toBeDefined();
    expect(getByText("Intervalo: 60 segundos")).toBeDefined();
  });
});
