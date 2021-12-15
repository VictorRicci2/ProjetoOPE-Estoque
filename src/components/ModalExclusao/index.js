import "./modalExclusao.css";
import { addExitProducts } from "models/exitProducts/exitProducts.js";

export default function ModalExclusao({ conteudo, close }) {
  return (
    <div className="modalExclusao">
      <div className="container">
        <div className="warning">
          <h3>Tem certeza que deseja deletar este item?</h3>
        </div>
        <button
          className="buttonContinue"
          onClick={() => addExitProducts(conteudo)}
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
