/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Table from "../Table";
import { MemberMock } from "../../../mocks";
import { generateRandomCode } from "../../../Utils/Generic/Utils";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";

jest.mock("../../../Utils/Generic/Utils", () => ({
  generateRandomCode: jest.fn(),
}));

const mockData: GridRowsProp = [
  {
    id: 1,
    codigo: "001",
    name: "John Doe",
    email: "john@example.com",
    telephone: "123456789",
  },
];

const mockColumns: GridColDef[] = [
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

  it.skip('should add a new row when "Adicionar membro" button is clicked', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    fireEvent.click(screen.getByText("Adicionar membro"));

    expect(screen.getByText("XYZ123")).toBeInTheDocument(); // o novo código gerado
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it.skip("should enable edit mode when edit button is clicked", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    fireEvent.click(screen.getByLabelText("Edit"));

    expect(screen.getByLabelText("Save")).toBeInTheDocument();
    expect(screen.getByLabelText("Cancel")).toBeInTheDocument();
  });

  it.skip("should save the row when save button is clicked", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    fireEvent.click(screen.getByLabelText(/Edit/i));
    fireEvent.click(screen.getByLabelText(/Save/i));

    expect(screen.queryByLabelText(/Save/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Cancel/i)).not.toBeInTheDocument();
  });

  it.skip("should delete the row when delete button is clicked", () => {
    render(<Table data={mockData} columns={mockColumns} />);
    const buttonDelete = screen.getByText("Delete");
    fireEvent.click(buttonDelete);

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
