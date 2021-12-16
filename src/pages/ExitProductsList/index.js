import { useState, useEffect } from "react";
import { getAllExitProducts } from "../../models/exitProducts/exitProducts.js";
import "./exitProducts.css";
import Title from "../../components/Title";
import { FiTrash2, FiEdit2, FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";
import ModalSaidaProdutos from "../../components/ModalSaidaProdutos";

export default function ExitProducts() {
  const [exitProducts, setExitProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPostModalEx, setShowPostModalEx] = useState(false);
  const [detail, setDetail] = useState();
  const [exclusao, setExclusao] = useState();

  async function ExitProductsList() {
    const data = await getAllExitProducts();
    updateState(data);
  }

  useEffect(() => {
    ExitProductsList();
  }, []);

  async function updateState(snapshot) {
    if(!snapshot || snapshot === "Nenhum produto cadastrado.") {
      snapshot = []
    }

    const isCollectionEmpty = snapshot.length === 0 ;

    if (!isCollectionEmpty) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          manufacturer: doc.manufacturer,
          name: doc.name,
          description: doc.description,
          quantity: doc.quantity,
          exitData: doc.exitData,
        });
      });
      setExitProducts(lista);
    } else {
      setIsEmpty(true);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); // se esta true ele vai negar e vai mudar pra false (!)
    setDetail(item);
  }

  function togglePostModalEx(item) {
    setShowPostModalEx(!showPostModalEx); // se esta true ele vai negar e vai mudar pra false (!)
    setExclusao(item);
  }

  if (loading) {
    return (
      <div>
        <div className="content">
          <Title name="Produtos">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando produtos...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="content">
        <Title name="Produtos">
          <FiMessageSquare size={25} />
        </Title>

        {exitProducts.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum produto registrado...</span>
          </div>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th scope="col">Fabricante</th>
                  <th scope="col">Produto</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Data de saída</th>
                  <th scope="col">...</th>
                </tr>
              </thead>
              <tbody>
                {exitProducts.map((item, index) => {
                  console.log("***", item);
                  return (
                    <tr key={index}>
                      <td data-label="Fabricante">{item.manufacturer}</td>
                      <td data-label="Produto">{item.name}</td>
                      <td data-label="Tipo">{item.description}</td>
                      <td data-label="Quantidade">
                        {item.quantity}
                        <span
                          className="badge"
                          style={{
                            backgroundColor: item.quantity === "#999",
                          }}
                        >
                          {item.quantity}
                        </span>
                      </td>
                      <td data-label="Data de saída">{item.exitData}</td>
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
                Buscando produtos...
              </h3>
            )}
          </>
        )}
      </div>
      {showPostModal && <Modal conteudo={detail} close={togglePostModal} />}
      {showPostModalEx && (
        <ModalSaidaProdutos conteudo={exclusao} close={togglePostModalEx} />
      )}
    </div>
  );
}
