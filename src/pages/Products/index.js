import { useState, useEffect } from "react";
import "./products.css";
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Modal from "../../components/Modal";

const listRef = firebase
  .firestore()
  .collection("products")
  .orderBy("created", "desc");

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function loadProducts() {
      await listRef
        .limit(5)
        .get()
        .then((snapshot) => {
          updateState(snapshot);
        })
        .catch((error) => {
          toast.error("Ops, deu algum erro.");
          setLoadingMore(false);
        });
      setLoading(false);
    }
    loadProducts();

    return () => {};
  }, []);

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.data().assunto,
          cliente: doc.data().cliente,
          clienteId: doc.data.clienteId,
          created: doc.data().created,
          createdFormatedData: format(
            doc.data().created.toDate(),
            "dd/MM/yyyy"
          ),
          status: doc.data().status,
          complemento: doc.data().complemento,
        });
      });
      const lastDoc = snapshot.docs[snapshot.docs.length - 1]; //PEGANDO ULTIMO DOCUMENTO REGISTRADO
      setProducts((products) => [...products, ...lista]);
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

  async function handleMore() {
    setLoadingMore(true);
    await listRef
      .startAfter(lastDocs)
      .limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      });
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); // se esta true ele vai negar e vai mudar pra false (!)
    setDetail(item);
  }

  if (loading) {
    return (
      <div>
        <div className="content">
          <Title name="Pedidos">
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
        <Title name="Pedidos">
          <FiMessageSquare size={25} />
        </Title>

        {products.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum pedido registrado...</span>
            <Link to="/new" className="new">
              <FiPlus size={25} color="white" />
              Novo pedido
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="white" />
              Novo pedido
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrando em</th>
                  <th scope="col">...</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.status === "Aberto" ? "#5cb85c" : "#999",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado">
                        {item.createdFormatedData}
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
                Buscando pedidos...
              </h3>
            )}
            {!loadingMore && !isEmpty && (
              <button className="btn-more" onClick={handleMore}>
                Buscar mais
              </button>
            )}
          </>
        )}
      </div>
      {showPostModal && <Modal conteudo={detail} close={togglePostModal} />}
    </div>
  );
}
