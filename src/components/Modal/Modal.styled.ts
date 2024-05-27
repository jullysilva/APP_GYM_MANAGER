import { Modal as BaseModal } from "@mui/base/Modal";
import styled from "styled-components";

export const ModalStyled = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  width: 600px;
  min-height: 400px;
  font-family: "IBM Plex Sans", sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e5eaf2;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
  padding: 24px;
  color: #1c2025;

  & .modal-title {
    margin: 0;
    line-height: 1.5rem;
    margin-bottom: 8px;
  }

  & .modal-description {
    margin: 0;
    line-height: 1.5rem;
    font-weight: 400;
    color: #303740;
    margin-bottom: 4px;
  }
`;
