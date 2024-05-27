import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;
`;

export const MainPainel = styled.div`
  background-color: transparent;

  .content {
    min-height: calc(100vh - px);
  }

  @media screen and (min-width: 992px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .content {
      padding-left: 15px;
      padding-right: 15px;
    }
  }
`;

export const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  border: 0 none;
  transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1),
    box-shadow 200ms ease;
`;

export const Icon = styled.div`
  display: inline-block;
  font: normal normal normal 14px / 1 "nucleo-icons";
  font-size: inherit;
  speak: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: yellow;
`;
