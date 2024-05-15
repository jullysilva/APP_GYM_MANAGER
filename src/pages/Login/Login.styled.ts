import styled from "styled-components";
import backgroundImage from "../../assets/hikebanner.png";

interface ButtonProps {
  color?: string;
}

const LoginPageContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${backgroundImage});
  background-size: cover;
`;

const LoginForm = styled.form`
  background-color: #fff;
  padding: 20% 15%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button<ButtonProps>`
  width: 100%;
  padding: 10px;
  background-color: ${({ color }) => color || "#666600"};
  color: #2f2e2e;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(81, 75, 195, 0.318);
    color: #fff;
  }
`;

export { LoginPageContainer, FormTitle, LoginForm, FormInput, FormButton };
