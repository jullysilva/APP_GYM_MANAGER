import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "../Table"; // ajuste o caminho conforme necessário
import { generateRandomCode } from "../../../Utils/Generic/Utils";

jest.mock("../../../Utils/Generic/Utils", () => ({
  generateRandomCode: jest.fn(),
}));

const mockData = [
  {
    id: 1,
    codigo: "001",
    name: "John Doe",
    email: "john@example.com",
    telephone: "123456789",
  },
];

const mockColumns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "codigo", headerName: "Código", width: 150 },
  { field: "name", headerName: "Nome", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "telephone", headerName: "Telefone", width: 150 },
];

describe("Table Component", () => {
  beforeEach(() => {
    (generateRandomCode as jest.Mock).mockReturnValue("XYZ123");
  });

  it("should render the table component", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByText("Adicionar membro")).toBeInTheDocument();
  });

  it('should add a new row when "Adicionar membro" button is clicked', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    fireEvent.click(screen.getByText("Adicionar membro"));

    expect(screen.getByText("XYZ123")).toBeInTheDocument(); // o novo código gerado
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("should enable edit mode when edit button is clicked", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    fireEvent.click(screen.getByLabelText("Edit"));

    expect(screen.getByLabelText("Save")).toBeInTheDocument();
    expect(screen.getByLabelText("Cancel")).toBeInTheDocument();
  });

  it("should save the row when save button is clicked", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    fireEvent.click(screen.getByLabelText("Edit"));
    fireEvent.click(screen.getByLabelText("Save"));

    expect(screen.queryByLabelText("Save")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Cancel")).not.toBeInTheDocument();
  });

  it("should delete the row when delete button is clicked", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    fireEvent.click(screen.getByLabelText("Delete"));

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Table data={mockData} columns={mockColumns} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
