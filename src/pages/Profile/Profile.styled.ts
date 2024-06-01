import styled, { css, keyframes } from "styled-components";

interface ButtonProps {
  color?: string;
  disabled?: boolean;
}

export const Container = styled.div`
  margin-top: 1rem;
`;

const pulse = keyframes`
{
  0% {
      transform: scale(0.10);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  50% {
    transform: scale(0.60);
    box-shadow: 0 0 10px 10px rgba(255, 0, 0, 0);
}
  70% {
      transform: scale(1);
      box-shadow: 0 0 10px 10px rgba(255, 0, 0, 0);
  }
  100% {
      transform: scale(0.50);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}`;

export const Card = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
  background-color: #fff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  .image {
    width: 100%;
    overflow: hidden;
    height: 100px;
    border-radius: 6px 6px 0 0;
    position: relative;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;

    img {
      width: 100%;
    }
  }
  .content {
    padding: 15px 15px 10px;
  }

  .card-user {
    .image {
      border-radius: 8px 8px 0 0;
      height: 150px;
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
      }
    }
    .content {
      min-height: 200px;
    }
  }

  .icon {
    width: 30px;
    height: 30px;
    float: right;
    border: 3px solid transparent;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    font-size: 24px;
    color: #898989;

    &:hover {
      color: white;
      background-color: #ffc60b;
      animation: ${pulse} 1.5s infinite;
      border-color: #ffc60b;
    }
  }

  @media (max-width: 568px) {
    .h5 {
      font-size: 1.75rem;
    }
  }
  @media (min-width: 569px) and (max-width: 991.98px) {
    .h5 {
      font-size: 0.95rem;
    }
  }
`;

export const Author = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  text-transform: none;
  margin-top: -65px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 15px;
  margin-right: 5px;
  overflow: hidden;
  border: 3px solid #fff;
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

export const Icon = styled.div`
  svg {
    float: right;
    border-radius: 50%;
    border: 3px solid transparent;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    font-size: 24px;
    color: #898989;

    &:hover {
      color: white;
      background-color: #ffc60b;
      border-color: #ffc60b;
    }
  }
`;

export const TeamMembers = styled.ul`
  li {
    padding: 10px 0;

    &:not(:last-child) {
      border-bottom: 1px solid #f1eae0;
    }
  }
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
  @media (max-width: 991.98px) {
    width: 30px;
    height: 30px;
  }
`;
