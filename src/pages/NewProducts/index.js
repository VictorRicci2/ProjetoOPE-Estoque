import "./newProducts.css";
import Title from "../../components/Title";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/userAuth";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

export default function NewProducts() {
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");
  const [idCustomer, setIdCustomer] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadCustomers() {
      await firebase
        .firestore()
        .collection("customers")
        .get()
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFornecedor: doc.data().nomeFornecedor,
            });
          });

          if (lista.length === 0) {
            setCustomers([{ id: "1", nomeFornecedor: "Freela" }]);
            setLoadCustomers(false);
            return;
          }
          setCustomers(lista);
          setLoadCustomers(false);

          if (id) {
            loadId(lista);
          }
        })
        .catch((error) => {
          setLoadCustomers(false);
          setCustomers([{ id: "1", nomeFornecedor: "" }]);
        });
    }
    loadCustomers();
  }, []);

  async function loadId(lista) {
    await firebase
      .firestore()
      .collection("chamados")
      .doc(id)
      .get()
      .then((snapshot) => {
        setAssunto(snapshot.data().assunto);
        setStatus(snapshot.data().status);
        setComplemento(snapshot.data().complemento);

        let index = lista.findIndex(
          (item) => item.id === snapshot.data().clienteId
        );
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((error) => {
        toast.error("Erro no ID passado");
        setIdCustomer(false);
      });
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (idCustomer) {
      await firebase
        .firestore()
        .collection("chamados")
        .doc(id)
        .update({
          cliente: customers[customerSelected].nomeFornecedor,
          clienteId: customers[customerSelected].id,
          assunto: assunto,
          status: status,
          complemento: complemento,
          userId: user.uid,
        })
        .then(() => {
          toast.success("Pedido editado com sucesso!");
          setCustomerSelected(0);
          setComplemento("");
          history.push("/dashboard");
        })
        .catch((error) => {
          toast.error("Ops, erro ao registrar.");
        });
      return;
    }

    await firebase
      .firestore()
      .collection("chamados")
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nomeFornecedor,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid,
      })
      .then(() => {
        toast.success("Pedido registrado com sucesso!");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error("Ops, erro ao registrar, tente novamente.");
      });
  }
  //CHAMA QUANDO TROCA O ASSUNTO
  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }
  // CHAMA QUANDO TROCA O STATUS
  function handleOptionChange(e) {
    setStatus(e.target.value);
  }
  //CHAMA QUANDO TROCA DE FORNECEDOR
  function handleChangeCustomers(e) {
    setCustomerSelected(e.target.value);
  }

  return (
    <div>
      <div className="content">
        <Title name="Novo pedido">
          <FiPlus size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Fornecedor</label>
            {loadCustomers ? (
              <input
                type="text"
                disabled={true}
                value="Carregando fornecedores..."
              />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomers}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFornecedor}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>
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
            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
