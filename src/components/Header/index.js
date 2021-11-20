import "./header.css";
import { AuthContext } from "../../contexts/userAuth";
import { useContext } from "react";
import avatar from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { FiUser, FiSettings } from "react-icons/fi";
import { MdOutlineRequestPage } from "react-icons/md";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatar : user.avatarUrl}
          alt="Foto avatar"
        />
      </div>

      <Link to="/dashboard">
        <MdOutlineRequestPage color="#fff" size={24} />
        Pedidos
      </Link>
      <Link to="/customers">
        <FiUser color="#fff" size={24} />
        Fornecedores
      </Link>
      <Link to="/produtos">
        <FiUser color="#fff" size={24} />
        Produtos
      </Link>
      <Link to="/profile">
        <FiSettings color="#fff" size={24} />
        Configurações
      </Link>
    </div>
  );
}
