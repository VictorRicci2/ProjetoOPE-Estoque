import { useState, useEffect, useContext } from "react";
import {
  getAllProducts,
  registerProducts,
} from "../../models/products/products.js";
import { getAllProviders } from "../../models/providers/providers";
import "./products.css";
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link, useHistory, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { AuthContext } from "../../contexts/userAuth";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [produtos, setProdutos] = useState("");
  const [quantidade, setQuantidade] = useState(0);
  const [status, setStatus] = useState("Aberto");
  const [providerSelected, setProviderSelected] = useState(0);
  const [loadProviders, setLoadProviders] = useState(true);
  const [providers, setProviders] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [idCustomer, setIdCustomer] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    async function ProductsList() {
      const data = await getAllProducts();
      updateState(data);
    }
    ProductsList();
  }, []);

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.length === 0;

    if (!isCollectionEmpty) {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          description: doc.description,
          manufacturer: doc.manufacturer,
          quantity: doc.quantity,
          name: doc.name,
          validationDate: doc.validationDate,
        });
      });
      setProducts((products) => [...products, ...lista]);
    } else {
      setIsEmpty(true);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  async function handleRegister(e) {
    // e.preventDefault();
    // if (idCustomer) {
    //   await firebase
    //     .firestore()
    //     .collection("chamados")
    //     .doc(id)
    //     .update({
    //       cliente: customers[customerSelected].nomeFornecedor,
    //       clienteId: customers[customerSelected].id,
    //       assunto: assunto,
    //       status: status,
    //       complemento: complemento,
    //       userId: user.uid,
    //     })
    //     .then(() => {
    //       toast.success("Pedido editado com sucesso!");
    //       setCustomerSelected(0);
    //       setComplemento("");
    //       history.push("/dashboard");
    //     })
    //     .catch((error) => {
    //       toast.error("Ops, erro ao registrar.");
    //     });
    //   return;
    // }
    // await firebase
    //   .firestore()
    //   .collection("chamados")
    //   .add({
    //     created: new Date(),
    //     cliente: customers[customerSelected].nomeFornecedor,
    //     clienteId: customers[customerSelected].id,
    //     assunto: assunto,
    //     status: status,
    //     complemento: complemento,
    //     userId: user.uid,
    //   })
    //   .then(() => {
    //     toast.success("Pedido registrado com sucesso!");
    //     setComplemento("");
    //     setCustomerSelected(0);
    //   })
    //   .catch((error) => {
    //     toast.error("Ops, erro ao registrar, tente novamente.");
    //   });
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); // se esta true ele vai negar e vai mudar pra false (!)
    setDetail(item);
  }

  //CHAMA QUANDO TROCA O ASSUNTO
  function handleChangeSelect(e) {
    setProdutos(e.target.value);
  }

  function handleChangeQuantity(e) {
    setQuantidade(e.target.value);
  }

  // CHAMA QUANDO TROCA O STATUS
  function handleOptionChange(e) {
    setStatus(e.target.value);
  }
  //CHAMA QUANDO TROCA DE FORNECEDOR
  function handleChangeProviders(e) {
    getAllProviders();
    setProviderSelected(e.target.value);
  }

  return (
    <div>
      <div className="content">
        <Title name="Novo produto">
          <FiPlus size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Fornecedor</label>
            {loadProviders ? (
              <input
                type="text"
                disabled={true}
                value="Carregando fornecedores..."
              />
            ) : (
              <select value={providerSelected} onChange={handleChangeProviders}>
                {providers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFornecedor}
                    </option>
                  );
                })}
              </select>
            )}
            {/* <div>
              <input type="text" value={produtos} onChange={handleChangeSelect}>
                Produto
              </input>
            </div>
            <div>
              <input type="number" value={quantidade} onChange={handleChangeQuantity}>
                Quantidade
              </input>
            </div> */}
            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em Aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Em Progresso</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>
            <label>Descrição</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
      <div className="content">
        <Title name="Lista de Produtos">
          <FiMessageSquare size={25} />
        </Title>

        {products.length === 0 ? (
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
                {products.map((item, index) => {
                  console.log("ITEMASDM", item);
                  return (
                    <tr key={index}>
                      <td data-label="Produto">{item.name}</td>
                      <td data-label="Descrição">{item.description}</td>
                      <td data-label="Quantidade">
                        {item.quantity}
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
