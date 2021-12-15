import "./modalSaidaProdutos.css";
import { FiX } from "react-icons/fi";
import { deletedExitProducts } from "models/exitProducts/exitProducts.js";

export default function ModalSaidaProdutos({ conteudo, close }) {
  return (
    <div className="modaSaidaProdutos">
      <div className="container">
        <div>
          <h3>Tem certeza que deseja deletar este item?</h3>
        </div>
        <button
          className="buttonContinue"
          onClick={() => deletedExitProducts(conteudo.id)}
        >
          Continuar
        </button>
        <button className="buttonCancel" onClick={close}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
