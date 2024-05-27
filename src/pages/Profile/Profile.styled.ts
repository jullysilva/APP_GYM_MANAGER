import styled, { css } from "styled-components";

interface ButtonProps {
  color?: string;
  disabled?: boolean;
}

export const Box = styled.div`
  padding: 5vh;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: strecth;
  justify-content: space-evenly;
`;

export const Title = styled.div`
  width: 100%;
  margin-bottom: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Card = styled.div`
  padding: 5vh;
  // min-height: 20vh;
  min-width: 50vh;
  background-color: white;
  border-radius: 3vh;
  box-shadow: 0px 0px 33px 20px rgba(0, 0, 0, 0.1);
`;

export const Divider = styled.div`
  margin: 2vh 0;
  border: 0.2px solid #e8eced;
`;

export const Row = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;

  p {
    margin-bottom: 0;
  }
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardImage = styled.div`
  width: 30vh;
  padding-bottom: 3vh;
`;

export const Image = styled.img`
  // vertical-align: middle;
  // width: 30vh;
  // height: 30vh;
  // border-radius: 50%;
`;

export const UpdateInfo = styled.form`
  max-width: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputLabel = styled.label`
  font-weight: 700;
`;

export const Button = styled.button<ButtonProps>`
  width: 50%;
  padding: 0.7rem 0;
  background-color: transparent;
  color: #4048bf;
  border: none;
  border-radius: 5rem;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background-color 0.8s;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}

  &:not(:disabled):hover {
    background-color: #4048bf;
    color: #fff;
  }
`;
