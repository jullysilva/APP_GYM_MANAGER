import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UploadImage from "../UploadImage";

describe("UploadImage Component", () => {
  it("renders the initial image and button", () => {
    render(<UploadImage />);

    const button = screen.getByText("Atualizar");
    const image = screen.getByRole("img");
    const input = screen.getByTestId("profile-picture");

    expect(button).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("user-profile.svg")
    );
    expect(input).not.toBeVisible();
  });

  it("opens file selector on button click", () => {
    render(<UploadImage />);

    const button = screen.getByText("Atualizar");
    fireEvent.click(button);

    const input = screen.getByTestId("profile-picture");
    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty("type", "file");
  });

  it("updates image when a new file is selected", async () => {
    render(<UploadImage />);

    const button = screen.getByText("Atualizar");
    fireEvent.click(button);

    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const input = screen.getByTestId("profile-picture");

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      const updatedImage = screen.getByRole("img");
      expect(updatedImage).toHaveAttribute(
        "src",
        expect.stringContaining("data:image/png;base64")
      );
    });
  });
});
