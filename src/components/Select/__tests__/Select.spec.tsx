import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Select from "../Select";
import { ICategory } from "../../../Utils/Interfaces/Interface";

const mockRegister = jest.fn(() => ({
  name: "mockName",
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
}));

describe("Select Component", () => {
  const data: ICategory[] = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  it("renders correctly with title", () => {
    render(
      <Select title="Select Title" data={data} register={mockRegister()} />
    );
    expect(screen.getByText("Select Title")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(
      <Select title="Select Title" data={data} register={mockRegister()} />
    );
    data.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls register function correctly", () => {
    render(
      <Select title="Select Title" data={data} register={mockRegister()} />
    );
    expect(mockRegister).toHaveBeenCalled();
  });
});
