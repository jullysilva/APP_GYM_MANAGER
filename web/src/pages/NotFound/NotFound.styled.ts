import { styled } from "styled-components";

export const Container = styled.div`
  font-family: "Roboto";
  height: 100vh;
  background: #121212;
  padding: 1em;
  overflow: hidden;
`;

export const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
`;

export const H1 = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-family: "Eczar";
  font-size: 60vmax;
  color: #ffc60b;
  letter-spacing: 0.025em;
  margin: 0;
  transition: 750ms ease-in-out;
`;

export const Link = styled.a`
  border: 2px solid #ffc60b;
  padding: 0.5em 0.8em;
  position: fixed;
  z-index: 1;
  color: #ffc60b;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: 150ms;
  svg > polyline {
    transition: 150ms;
  }
  &:hover {
    color: #eeeefd;
    background: #4048bf;
    border-color: transparent;
    svg > polyline {
      stroke: #eeeefd;
    }
    h1 {
      color: #4048bf;
    }
  }
`;

export const Text = styled.p`
  color: #ffc60b;
  font-size: calc(1em + 3vmin);
  position: fixed;
  bottom: 1rem;
  right: 1.5rem;
  margin: 0;
  line-height: 2rem;
  text-align: right;
  text-shadow: -1px -1px 0 #121212, 1px 1px 0 #121212, -1px 1px 0 #121212,
    1px -1px 0 #121212;
  @media screen and (min-width: 340px) {
    width: 70%;
  }
  @media screen and (min-width: 560px) {
    width: 50%;
  }
  @media screen and (min-width: 940px) {
    width: 30%;
  }
  @media screen and (min-width: 1300px) {
    width: 25%;
  }
`;
