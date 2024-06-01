import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";
import "./styles.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "Utils/Context/useAuth";

interface SidebarProps {
  menuOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ menuOpen }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Lógica para realizar o logout do sistema
    logout();
    console.log("Logout realizado com sucesso");
  };

  return (
    <>
      <Menu isOpen={menuOpen}>
        <Link id="Dashboard" className="menu-item" to="/painel">
          Dashboard
        </Link>
        <Link id="financas" className="menu-item" to="/financas">
          Finanças
        </Link>
        <Link id="alunos" className="menu-item" to="/alunos">
          Alunos
        </Link>
        <Link id="exercicio" className="menu-item" to="/exercicio">
          Exercício
        </Link>
        <Link id="fichadetreino" className="menu-item" to="/fichadetreino">
          Fichas de treino
        </Link>
        <footer className="bm-menu-footer">
          <button
            className="bm-menu-footer-button"
            data-testid="exit-button"
            onClick={() => handleLogout()}
          >
            <FaSignOutAlt className="icon" /> Sair
          </button>
        </footer>
      </Menu>
    </>
  );
};

export default Sidebar;
