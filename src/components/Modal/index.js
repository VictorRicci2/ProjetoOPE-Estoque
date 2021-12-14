import "./modal.css";
import { FiX } from "react-icons/fi";

export default function Modal({ conteudo, close }) {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={23} color={"#fff"} />
          Voltar
        </button>
        <div>
          <h2>Detalhes do produto</h2>
          <div className="row">
            <span>
              Fabricante: <i>{conteudo.manufacturer}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Tipo: <i>{conteudo.description}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.createdFormated}</i>
            </span>
          </div>
          <div>
            <span>
              Quantidade: <i>{conteudo.quantity}</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
