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
          <h2>Detalhes do pedido</h2>
          <div className="row">
            <span>
              Fornecedor: <i>{conteudo.providers}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Descrição: <i>{conteudo.description}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.createdFormated}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Quantidade:{" "}
              <i>
                {conteudo.quantity}
              </i>
            </span>
          </div>
          {conteudo.complemento !== "" && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.complemento}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
