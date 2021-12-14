import "./providers.css";
import Title from "../../components/Title";
import Modal from "../../components/Modal";
import {
  getAllProviders,
  registerProviders,
} from "../../models/providers/providers";
import {
  FiUser,
  FiEdit2,
  FiMessageSquare,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalExclusao from "components/ModalExclusao";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPostModalEx, setShowPostModalEx] = useState(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [detail, setDetail] = useState();
  const [exclusao, setExclusao] = useState();

  useEffect(() => {
    async function ProvidersList() {
      const data = await getAllProviders();
      updateState(data);
    }
    ProvidersList();
  }, []);

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.length === 0;

    if (!isCollectionEmpty) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          telefone: doc.cellphone,
          name: doc.name,
          email: doc.email,
        });
      });
      setProviders((providers) => [...providers, ...lista]);
    } else {
      setIsEmpty(true);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  async function Providers(event) {
    event.preventDefault()
    setLoading(true);
    return registerProviders(nomeFornecedor, email, telefone);
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); // se esta true ele vai negar e vai mudar pra false (!)
    setDetail(item);
  }

  function togglePostModalEx(item) {
    setShowPostModalEx(!showPostModalEx); // se esta true ele vai negar e vai mudar pra false (!)
    setExclusao(item);
  }

  return (
    <div>
      <div className="content">
        <Title name="Cadastrar Fornecedor">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers">
            <label>Nome</label>
            <input
              type="text"
              value={nomeFornecedor}
              placeholder="Nome do fornecedor"
              onChange={(e) => setNomeFornecedor(e.target.value)}
            />
            <label>E-mail</label>
            <input
              type="text"
              placeholder="E-mail do fornecedor"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Telefone</label>
            <input
              type="text"
              value={telefone}
              placeholder="Telefone do fornecedor"
              onChange={(e) => setTelefone(e.target.value)}
            />
            <button type="submit" onClick={(event) => Providers(event)}>
              Cadastrar
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="content">
          <Title name="Lista de Fornecedores">
            <FiMessageSquare size={25} />
          </Title>

          {providers.length === 0 ? (
            <div className="container dashboard">
              <span>Buscando fornecedores...</span>
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">...</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Nome">{item.name}</td>
                        <td data-label="E-mail">{item.email}</td>
                        <td data-label="Telefone">
                          {item.telefone}
                          <span
                            className="badge"
                            style={{
                              backgroundColor: item.quantity === "#000",
                            }}
                          >
                            {item.quantity}
                          </span>
                        </td>
                        <td data-label="#">
                          <Link
                            className="action"
                            style={{ backgroundColor: "#A9A9A9" }}
                            to={`/new/${item.id}`}
                          >
                            <FiEdit2 color="#fff" size={17} />
                          </Link>
                          <button
                            className="action"
                            style={{ backgroundColor: "#ff0000" }}
                            onClick={() => togglePostModalEx(item)}
                          >
                            <FiTrash2 color="#fff" size={17} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {loadingMore && (
                <h3 style={{ textAlign: "center", marginTop: 15 }}>
                  Buscando fornecedores...
                </h3>
              )}
            </>
          )}
        </div>
        {showPostModal && <Modal conteudo={detail} close={togglePostModal} />}
        {showPostModalEx && (
          <ModalExclusao conteudo={exclusao} close={togglePostModalEx} />
        )}
      </div>
    </div>
  );
}
