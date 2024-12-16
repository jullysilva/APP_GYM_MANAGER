import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const Status = styled.span`
  padding: 0.5rem;
  height: 24px;
  border: 1px solid ${(props) => props.color || "lightgrey"};
  border-radius: 16px;
  color: ${(props) => props.color || "inherit"};
  transition: border-color 0.3s ease;

  &:hover {
    animation: ${pulse} 1s infinite;
  }
`;
