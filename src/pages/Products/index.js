import { useState, useEffect, useContext } from "react";
import {
  getAllProducts,
  registerProducts,
} from "../../models/products/products.js";
import { getAllProviders } from "../../models/providers/providers";
import "./products.css";
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link, useHistory, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import ModalExclusao from "../../components/ModalExclusao";
import { AuthContext } from "../../contexts/userAuth";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [fabricante, setFabricantes] = useState("");
  const [produtos, setProdutos] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrada, setDataEntrada] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [providerSelected, setProviderSelected] = useState(0);
  const [loadProviders, setLoadProviders] = useState(true);
  const [providers, setProviders] = useState([]);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPostModalEx, setShowPostModalEx] = useState(false);
  const [detail, setDetail] = useState();
  const [exclusao, setExclusao] = useState();

  async function ProductsList() {
    setLoadingList(true);
    const data = await getAllProducts();
    const dataProvider = await getAllProviders();
    updateState(data);
    setProviders(dataProvider);
    setLoadProviders(false);
    setLoadingList(false);
  }

  useEffect(() => {
    ProductsList();
  }, []);

  async function updateState(snapshot) {
    if (!snapshot || snapshot === "Nenhum produto cadastrado.") {
      snapshot = [];
    }
    const isCollectionEmpty = snapshot.length === 0;

    if (!isCollectionEmpty) {
      console.log(snapshot)
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          description: doc.description,
          manufacturer: doc.manufacturer,
          quantity: doc.quantity,
          name: doc.name,
          validationDate: doc.validationDate,
          entryDate: doc.entryDate,
        });
      });
      setProducts(lista);
    } else {
      setIsEmpty(true);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  async function handleRegisterProducts(event) {
    event.preventDefault();
    await registerProducts(
      produtos,
      fabricante,
      quantidade,
      dataValidade,
      dataEntrada,
      descricao
    );
    return ProductsList();
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); // se esta true ele vai negar e vai mudar pra false (!)
    setDetail(item);
    setExclusao(item);
  }

  function togglePostModalEx(item) {
    setShowPostModalEx(!showPostModalEx); // se esta true ele vai negar e vai mudar pra false (!)
    setExclusao(item);
  }

  //CHAMA QUANDO TROCA O ASSUNTO
  function handleChangeSelect(e) {
    setProdutos(e.target.value);
  }

  function handleChangeQuantity(e) {
    setQuantidade(e.target.value);
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
          <form className="form-profile" onSubmit={handleRegisterProducts}>
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
                      {item.name}
                    </option>
                  );
                })}
              </select>
            )}
            <label>Fabricante</label>
            <input
              type="text"
              placeholder="Ex: Ambev"
              value={fabricante}
              onChange={(e) => setFabricantes(e.target.value)}
            />
            <label>Produto</label>
            <input
              type="text"
              placeholder="Ex: Coca-Cola"
              value={produtos}
              onChange={(e) => setProdutos(e.target.value)}
            />
            <label>Tipo</label>
            <input
              type="select"
              value={descricao}
              placeholder="Ex: Bebida Alcóolica"
              onChange={(e) => setDescricao(e.target.value)}
            />
            <label>Quantidade</label>
            <input
              type="number"
              value={quantidade}
              placeholder="Ex: 10"
              onChange={(e) => setQuantidade(e.target.value)}
            />
            <label>Data de Entrada</label>
            <input
              type="date"
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
            />
            <label>Data de Validade</label>
            <input
              type="date"
              value={dataValidade}
              onChange={(e) => setDataValidade(e.target.value)}
            />
            <button
              type="submit"
              onClick={(event) => {
                handleRegisterProducts(event);
              }}
            >
              Registrar
            </button>
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
                  <th scope="col">Fabricante</th>
                  <th scope="col">Produto</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Data de Entrada</th>
                  <th scope="col">Data de validade</th>
                  <th scope="col">...</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Fabricante">{item.manufacturer}</td>
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
                      <td data-label="Data de entrada">{item.entryDate}</td>
                      <td data-label="Data de validade">
                        {item.validationDate}
                      </td>
                      <td data-label="#">
                        <Link
                          className="action"
                          style={{ backgroundColor: "#A9A9A9" }}
                          to={`/listaprodutos/${item.id}`}
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
        <ModalExclusao conteudo={exclusao} close={togglePostModalEx} />
      )}
    </div>
  );
}
