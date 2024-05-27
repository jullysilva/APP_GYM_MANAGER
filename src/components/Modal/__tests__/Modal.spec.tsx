import React from "react";
import { render, screen } from "@testing-library/react";
import ModalBase from "../Modal";

describe("ModalBase Component", () => {
  it("renders correctly when isOpen is true", () => {
    render(
      <ModalBase isOpen={true} setOpen={() => {}}>
        <div>Modal Content</div>
      </ModalBase>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <ModalBase isOpen={false} setOpen={() => {}}>
        <div>Modal Content</div>
      </ModalBase>
    );
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });
});
