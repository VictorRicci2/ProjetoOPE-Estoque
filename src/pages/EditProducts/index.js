import { useState } from "react";
import {
  getAllProducts,
  registerProducts,
} from "../../models/products/products.js";
import Title from "../../components/Title";
import { FiEdit } from "react-icons/fi";
import { getAllProviders } from "../../models/providers/providers";

export default function EditProducts() {
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
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  async function ProductsList() {
    setLoadingList(true);
    const data = await getAllProducts();
    const dataProvider = await getAllProviders();
    updateState(data);
    setProviders(dataProvider);
    setLoadProviders(false);
    setLoadingList(false);
  }

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

  function handleChangeProviders(e) {
    getAllProviders();
    setProviderSelected(e.target.value);
  }

  return (
    <div className="content">
      <Title name="Editar Produto">
        <FiEdit size={25} />
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
            placeholder="Ex: 10/12/2021"
            onChange={(e) => setDataEntrada(e.target.value)}
          />
          <label>Data de Validade</label>
          <input
            type="date"
            value={dataValidade}
            placeholder="Ex: 10/12/2021"
            onChange={(e) => setDataValidade(e.target.value)}
          />
          <button
            type="submit"
            onClick={(event) => {
              handleRegisterProducts(event);
            }}
          >
            Editar
          </button>
        </form>
      </div>
    </div>
  );
}
