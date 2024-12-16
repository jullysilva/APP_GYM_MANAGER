// SignIn.styled.ts
import styled from "styled-components";

export const Title = styled.h1`
  font-weight: bold;
  margin: 0;
`;

export const Container = styled.div`
  background-color: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  // height: 100vh;
  margin: -20px 0 50px;
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.6s ease-in-out;

  &.active {
    transform: translateX(0);
  }

  &.inactive {
    transform: translateX(-100%);
  }
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0;
  z-index: 1;
  transition: all 0.6s ease-in-out;

  &.active {
    opacity: 1;
    z-index: 5;
    transform: translateX(0);
  }

  &.inactive {
    opacity: 0;
    z-index: 1;
    transform: translateX(100%);
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;

  &.right-panel-active {
    transform: translateX(-100%);
  }
`;

export const Overlay = styled.div`
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;

  &.left {
    transform: translateX(-20%);
  }

  &.right {
    transform: translateX(0);
  }
`;

export const SignUpButton = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`;

export const SignInButton = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: transparent;
  color: #ff4b2b;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`;
