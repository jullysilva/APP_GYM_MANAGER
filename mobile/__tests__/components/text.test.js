import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TextApp from "../../src/components/Text";

describe("TextApp component", () => {
  test("renders correctly", () => {
    const { getByText } = render(<TextApp text="Hello World" size={16} />);
    const textElement = getByText("Hello World");
    expect(textElement).toBeDefined();
  });

  test("fires onPress event", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <TextApp text="Press Me" size={16} onPress={onPressMock} />
    );
    const textElement = getByText("Press Me");
    fireEvent.press(textElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  test("applies bold font weight when isBold prop is true", () => {
    const { getByText } = render(<TextApp text="Bold Text" size={16} isBold />);
    const textElement = getByText("Bold Text");
    expect(textElement.props.style.fontWeight).toBe("bold");
  });

  test("applies specified font weight when fontWeight prop is provided", () => {
    const { getByText } = render(
      <TextApp text="Custom Weight Text" size={16} fontWeight="500" />
    );
    const textElement = getByText("Custom Weight Text");
    expect(textElement.props.style.fontWeight).toBe("500");
  });

  test("applies custom color when color prop is provided", () => {
    const { getByText } = render(
      <TextApp text="Colored Text" size={16} color="red" />
    );
    const textElement = getByText("Colored Text");
    expect(textElement.props.style.color).toBe("red");
  });
});
