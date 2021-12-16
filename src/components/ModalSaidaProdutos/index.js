import "./modalSaidaProdutos.css";
import { deletedExitProducts } from "models/exitProducts/exitProducts.js";

export default function ModalSaidaProdutos({ conteudo, close }) {
  return (
    <div className="modalSaidaProdutos">
      <div className="container">
        <div className="warning">
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
