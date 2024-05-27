import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  -webkit-transition-duration: 0.8s;
  color: #4048bf;
  opacity: 1;
  transition: all 150ms linear;
  border: none;
  min-width: 1.875rem;
  padding: 0.7rem;
  font-size: 0.9375rem;
  overflow: hidden;
  position: relative;
  line-height: normal;
  border-radius: 30px;

  svg {
    width: 22px;
    height: 23px;
    margin-right: 0.3rem;
  }

  &:hover {
    color: #ffffff;
    background-color: #ffc60b;
    border: 1px solid #ffc60b;
    box-shadow: none;
  }

  // Extra small devices (portrait phones, less than 576px)
  @media (max-width: 575.98px) {
    font-size: 0;
  }

  // Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) and (max-width: 767.98px) {
  }

  // Medium devices (tablets, 768px and up)
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  // Large devices (desktops, 992px and up)
  @media (min-width: 992px) and (max-width: 1199.98px) {
  }

  // Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) {
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

export const Title = styled.p`
  align-content: center:
  margin-bottom: 0;
`;
