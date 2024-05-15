import React, { useState } from "react";
import "./styles.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

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
    <div className="App">
      <div className={containerClass} id="container">
        <Login />
        <Register />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bem-vindo de volta!</h1>
              <p>
                Para se manter conectado conosco, faça login com suas
                informações pessoais
              </p>
              <button
                className="ghost"
                data-testid="signIn"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Entrar
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Olá, Gerente!</h1>
              <p>Insira seus dados pessoais e comece sua jornada conosco</p>
              <button
                className="ghost"
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
