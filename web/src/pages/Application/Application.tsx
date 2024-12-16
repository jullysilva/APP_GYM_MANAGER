import React, { useState } from "react";
import "./styles.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Text, Title } from "./Application.styled";

const Application = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text: React.SetStateAction<string>) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="container-fluid" style={{ minHeight: "45rem" }}>
      <div className={containerClass} id="container">
        <Login />
        <Register />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Title>Bem-vindo de volta!</Title>
              <Text>
                Para se manter conectado conosco, faça login com suas
                informações pessoais
              </Text>
              <button
                className="ghost button"
                data-testid="signIn"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Entrar
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <Title>Olá, Gerente!</Title>
              <Text>
                Insira seus dados pessoais e comece sua jornada conosco
              </Text>
              <button
                className="ghost button"
                data-testid="signUp"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
