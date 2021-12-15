import { useState, useEffect } from "react";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";
import {
  getAllProviders,
  registerProviders,
} from "../../models/providers/providers";
import { mask } from "remask";

export default function EditProviders() {
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
      setProviders(lista);
    } else {
      setIsEmpty(true);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  async function Providers(event) {
    event.preventDefault();
    await registerProviders(nomeFornecedor, email, telefone);
    return ProvidersList();
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
