import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  bottom: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
  }
`;


export const SubContainer = styled.div`
  width: 80%;
  background: linear-gradient(to bottom right, white 0%, #e6e4ff 70%);
  flex-grow: 1;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem 0 0 0;
  }
`;