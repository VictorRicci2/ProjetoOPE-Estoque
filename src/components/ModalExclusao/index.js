import "./modalExclusao.css";
import { FiX } from "react-icons/fi";

export default function ModalExclusao({
  conteudo,
  close,
  setLoading,
}) {
  return (
    <div className="modalExclusao">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={23} color={"#fff"} />
          Voltar
        </button>
        <div>
          <h3>Tem certeza que deseja deletar este item?</h3>
        </div>
        {conteudo.name || conteudo.providers !== "" && (
          <>
            <p>{conteudo.name}</p>
            <p>{conteudo.providers}</p>
          </>
        )}
        <button
          onChange={() => {
            setLoading(true);
          }}
        >
          Continuar
        </button>
        <button onClick={close}>Cancelar</button>
      </div>
    </div>
  );
}
