import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../Login";
import { useAuth } from "../../../Utils/Context/useAuth";
import { toast } from "react-toastify";

jest.mock("../../../Utils/Context/useAuth");
jest.mock(MockAdapter, "axios-mock-adapter");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("react-toastify");

const mockSetUser = jest.fn();
const mockNavigate = jest.fn();

describe("Login Component", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ setUser: mockSetUser });
    (toast.error as jest.Mock).mockImplementation(jest.fn());
    (
      jest.requireMock("react-router-dom").useNavigate as jest.Mock
    ).mockReturnValue(mockNavigate);

    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  test("renders the Login component", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByTestId("sign-in-container")).toBeInTheDocument();
    expect(screen.getByText("Entrar")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Esqueceu a senha?")).toBeInTheDocument();
    expect(screen.getByText("Acessar")).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText("Acessar"));

    await waitFor(() => {
      expect(screen.getByText("Email é obrigatório")).toBeInTheDocument();
      expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
    });
  });

  test("calls accessManager and handles successful login", async () => {
    const mockResponse = {
      status: "success",
      manager: { email: "test@example.com", name: "Test User", id: "1" },
      token: "test-token",
    };
    mockAxios.onPost("/accessManager").reply(200, mockResponse);

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Acessar"));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        email: "test@example.com",
        name: "Test User",
        token: "test-token",
        manager: { email: "test@example.com", name: "Test User", id: "1" },
      });
      expect(mockNavigate).toHaveBeenCalledWith("/painel");
    });
  });

  test("shows error message on login failure", async () => {
    mockAxios.onPost("/accessManager").reply(400, {
      response: { data: { error: "Invalid credentials" } },
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByText("Acessar"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Erro: Invalid credentials");
    });
  });
});
