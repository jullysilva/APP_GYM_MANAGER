import React, { ReactNode } from "react";
import clsx from "clsx";
import { styled } from "@mui/system";
import { ModalStyled, ModalContent } from "./Modal.styled";

interface ModalBaseProps {
  isOpen: boolean;
  setOpen: (arg0: boolean) => void;
  children: ReactNode;
  width?: number;
  maxHeight?: number;
}

const ModalBase: React.FC<ModalBaseProps> = ({
  isOpen,
  setOpen,
  children,
  width,
  maxHeight,
}) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ModalStyled
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={isOpen}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent size={width} height={maxHeight}>
          {children}
        </ModalContent>
      </ModalStyled>
    </div>
  );
};

export default ModalBase;

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
