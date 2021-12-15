import { useState, useEffect } from "react";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";
import {
  getAllProviders,
  registerProviders,
  updateProviders,
} from "../../models/providers/providers";
import { mask } from "remask";

export default function EditProviders(props) {
  const [providers, setProviders] = useState([]);
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loadingMore, setLoadingMore] = useState(true);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  async function ProvidersList() {
    const data = await getAllProviders();
    updateState(data);
  }

  useEffect(() => {
    ProvidersList();
  }, []);

  async function updateState(snapshot) {
    const { id } = props.match.params;
    snapshot.forEach((provider) => {
      if (provider.id === id) {
        setNomeFornecedor(provider.name);
        setEmail(provider.email);
        setTelefone(provider.cellphone);
      }
    });
  }

  async function Providers(event) {
    const { id } = props.match.params;
    event.preventDefault();
    await updateProviders(id, nomeFornecedor, email, telefone);
    await new Promise(r => setTimeout(r, 2000));
    return window.location.href = "/fornecedores"
  }

  return (
    <div className="content">
      <Title name="Editar Fornecedor">
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
            onChange={(e) =>
              setTelefone(mask(e.target.value, ["(99) 99999-9999"]))
            }
          />
          <button type="submit" onClick={(event) => Providers(event)}>
            Editar
          </button>
        </form>
      </div>
    </div>
  );
}
