import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../Profile";

describe("AdmManager Component", () => {
  const setOpenMock = jest.fn();
  const addAdminMock = jest.fn();

  const renderComponent = () => {
    return render(
      <Profile open={true} setOpen={setOpenMock} addAdmin={addAdminMock} />
    );
  };

  beforeEach(() => {
    setOpenMock.mockClear();
    addAdminMock.mockClear();
  });

  it("renders the modal with the form", () => {
    renderComponent();

    expect(screen.getByText("Administrador")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByTestId("button-save")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Nome completo"), {
      target: { value: "João Souza da Silva" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "joao@example.com" },
    });

    fireEvent.click(screen.getByTestId("button-save"));

    await waitFor(() => {
      expect(addAdminMock).toHaveBeenCalledWith({
        nome: "João Souza da Silva",
        email: "joao@example.com",
      });
    });

    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  test("shows validation error if the form is submitted with empty fields", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("button-save"));

    await waitFor(() => {
      expect(
        screen.getByText("Nome completo é obrigatório")
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();

    expect(addAdminMock).not.toHaveBeenCalled();
  });
});
