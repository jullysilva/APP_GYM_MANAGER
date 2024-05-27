import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./styles.css";
import { FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  menuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ menuOpen }) => {
  const handleLogout = () => {
    // Lógica para realizar o logout do sistema
    console.log("Logout realizado com sucesso");
  };

  return (
    <>
      <Menu isOpen={menuOpen}>
        <a id="Dashboard" className="menu-item" href="/painel">
          Dashboard
        </a>
        <a id="financas" className="menu-item" href="/financas">
          Finanças
        </a>
        <a id="alunos" className="menu-item" href="/alunos">
          Alunos
        </a>
        <a id="treinadores" className="menu-item" href="/treinadores">
          Treinadores
        </a>
        <a id="exercicio" className="menu-item" href="/exercicio">
          Exercício
        </a>
        <a id="fichadetreino" className="menu-item" href="/fichadetreino">
          Fichas de treino
        </a>
        <footer className="bm-menu-footer">
          <button className="bm-menu-footer-button" onClick={handleLogout}>
            <FaSignOutAlt className="icon" data-testId="exit" /> Sair
          </button>
        </footer>
      </Menu>
    </>
  );
};

export default Sidebar;
