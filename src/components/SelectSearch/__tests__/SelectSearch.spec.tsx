import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectSearch from "../SelectSearch";
import { GridValidRowModel } from "@mui/x-data-grid";

// Mock data
const mockOptions: GridValidRowModel[] = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

describe("SelectSearch Component", () => {
  it("renders without crashing", () => {
    render(
      <SelectSearch
        title="Test Select"
        options={mockOptions}
        setData={jest.fn()}
      />
    );
    expect(screen.getByText("Test Select")).toBeInTheDocument();
  });

  it("renders options correctly", () => {
    render(
      <SelectSearch
        title="Test Select"
        options={mockOptions}
        setData={jest.fn()}
      />
    );
    const input = screen.getByRole("combobox");
    fireEvent.mouseDown(input);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it("calls setData when an option is selected", () => {
    const mockSetData = jest.fn();
    render(
      <SelectSearch
        title="Test Select"
        options={mockOptions}
        setData={mockSetData}
      />
    );
    const input = screen.getByRole("combobox");
    fireEvent.mouseDown(input);

    const option = screen.getByText(mockOptions[0].name);
    fireEvent.click(option);

    expect(mockSetData).toHaveBeenCalledWith([mockOptions[0]]);
  });

  it("displays selected options as tags", () => {
    render(
      <SelectSearch
        title="Test Select"
        options={mockOptions}
        setData={jest.fn()}
      />
    );
    const input = screen.getByRole("combobox");
    fireEvent.mouseDown(input);

    const option = screen.getByText(mockOptions[0].name);
    fireEvent.click(option);

    const tag = screen.getByText(mockOptions[0].name);
    expect(tag).toBeInTheDocument();
  });

  it("removes a tag when the close button is clicked", () => {
    const mockSetData = jest.fn();
    render(
      <SelectSearch
        title="Test Select"
        options={mockOptions}
        setData={mockSetData}
      />
    );
    const input = screen.getByRole("combobox");
    fireEvent.mouseDown(input);

    const option = screen.getByText(mockOptions[0].name);
    fireEvent.click(option);

    const tagCloseButton = screen.getByRole("button");
    fireEvent.click(tagCloseButton);

    expect(mockSetData).toHaveBeenCalledWith([]);
  });
});
