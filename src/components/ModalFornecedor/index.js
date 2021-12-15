import "./modalFornecedor.css";
import { deleteProviders} from "models/providers/providers";

export default function ModalFornecedor({ conteudo, close }) {
  return (
    <div className="modalExclusao">
      <div className="container">
        <div className="warning">
          <h3>Tem certeza que deseja deletar este item?</h3>
        </div>
        <button
          className="buttonContinue"
          onClick={() => { deleteProviders(conteudo.id); window.location.reload()}}
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
