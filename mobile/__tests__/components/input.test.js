import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Input from "../../src/components/Input";

describe("Input component", () => {
  test("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <Input
        text="Username"
        value=""
        onChangeText={() => {}}
        placeholder="Enter your username"
      />
    );
    const inputElement = getByPlaceholderText("Enter your username");
    expect(inputElement).toBeDefined();
  });

  test("fires onChangeText event", () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        text="Username"
        value=""
        onChangeText={onChangeTextMock}
        placeholder="Enter your username"
      />
    );
    const inputElement = getByPlaceholderText("Enter your username");
    fireEvent.changeText(inputElement, "test");
    expect(onChangeTextMock).toHaveBeenCalledWith("test");
  });

  test("applies secureTextEntry style when password prop is true", () => {
    const { getByPlaceholderText } = render(
      <Input
        text="Password"
        value=""
        onChangeText={() => {}}
        placeholder="Enter your password"
        password
      />
    );
    const inputElement = getByPlaceholderText("Enter your password");
    expect(inputElement.props.secureTextEntry).toBe(true);
  });

  test("applies keyboardType style when keyboardType prop is provided", () => {
    const { getByPlaceholderText } = render(
      <Input
        text="Email"
        value=""
        onChangeText={() => {}}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
    );
    const inputElement = getByPlaceholderText("Enter your email");
    expect(inputElement.props.keyboardType).toBe("email-address");
  });

  test("applies maxLength prop when maxLength prop is provided", () => {
    const { getByPlaceholderText } = render(
      <Input
        text="Number"
        value=""
        onChangeText={() => {}}
        placeholder="Enter a number"
        keyboardType="decimal-pad"
        maxLength={5}
      />
    );
    const inputElement = getByPlaceholderText("Enter a number");
    expect(inputElement.props.maxLength).toBe(5);
  });

  test("fires onBlur event", () => {
    const onBlurMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        text="Name"
        value=""
        onChangeText={() => {}}
        onBlur={onBlurMock}
        placeholder="Enter your name"
      />
    );
    const inputElement = getByPlaceholderText("Enter your name");
    fireEvent(inputElement, "blur");
    expect(onBlurMock).toHaveBeenCalled();
  });
});
