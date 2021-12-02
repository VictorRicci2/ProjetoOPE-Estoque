import { useState, useEffect } from "react";
import ExitProductsModel from "../../models/exitProducts/exitProducts.js";
import "./exitProducts.css";
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

export default function ExitProducts() {
  const [exitProducts, setExitProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function ExitProductsList(){
      const data = await ExitProductsModel()
      updateState(data)
    }
    ExitProductsList()
  }, []);

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.length === 0;

    if (!isCollectionEmpty) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          productId: doc.productId,
          quantity: doc.exitData,
        });
      });
      setExitProducts((exitProducts) => [...exitProducts, ...lista]);
    } else {
      setIsEmpty(true);
    }
    setLoading(false);
    setLoadingMore(false)
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); // se esta true ele vai negar e vai mudar pra false (!)
    setDetail(item);
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
                  <th scope="col">Produto</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">...</th>
                </tr>
              </thead>
              <tbody>
                {exitProducts.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Produto">{item.productId}</td>
                      <td data-label="Descrição">{item.description}</td>
                      <td data-label="Quantidade">{item.exitData}
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.exitData === "#999",
                          }}
                        >
                          {item.exitData}
                        </span>
                      </td>
                      <td data-label="#">
                        <button
                          className="action"
                          style={{ backgroundColor: "#3583f6" }}
                          onClick={() => togglePostModal(item)}
                        >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <Link
                          className="action"
                          style={{ backgroundColor: "#f6a935" }}
                          to={`/new/${item.id}`}
                        >
                          <FiEdit2 color="#fff" size={17} />
                        </Link>
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
    </div>
  );
}
