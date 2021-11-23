import "./customers.css";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function Customers() {
  const [nomeFornecedor, setNomeFornecedor] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  async function handleAdd(e) {
    e.preventDefault();

    if (nomeFornecedor !== "" && email !== "" && telefone !== "") {
      await firebase
        .firestore()
        .collection("customers")
        .add({ nomeFornecedor: nomeFornecedor, email: email, telefone: telefone })
        .then(() => {
          setNomeFornecedor("");
          setEmail("");
          setTelefone("");
          toast.info("Empresa cadastrada com sucesso!");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Erro ao cadastrar esse empresa.");
        });
    } else {
      toast.error("Preencha todos os campos!");
    }
  }

  return (
    <div>
      <div className="content">
        <Title name="Fornecedores">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
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
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
