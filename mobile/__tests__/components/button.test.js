import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../../src/components/Button";

describe("Button component", () => {
  test("renders correctly", () => {
    const { getByText } = render(<Button title="Press Me" />);
    const buttonElement = getByText("Press Me");
    expect(buttonElement).toBeDefined();
  });

  test("fires onPress event", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Press Me" onPress={onPressMock} />
    );
    const buttonElement = getByText("Press Me");
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  test("renders large button correctly", () => {
    const { getByText, getByTestId } = render(
      <Button title="Press Me" size="large" />
    );
    const buttonElement = getByText("Press Me");
    const largeButton = getByTestId("large-button");
    expect(buttonElement).toBeDefined();
    expect(largeButton).toBeTruthy();
  });

  test("renders transparent button correctly", () => {
    const { getByText, getByTestId } = render(
      <Button title="Press Me" transparent />
    );
    const buttonElement = getByText("Press Me");
    const transparentButton = getByTestId("transparent-button");
    expect(buttonElement).toBeDefined();
    expect(transparentButton).toBeTruthy();
  });
});
