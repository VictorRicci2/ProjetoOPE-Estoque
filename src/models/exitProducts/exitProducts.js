import axios from "axios";
import { toast } from "react-toastify";

async function getAllExitProducts() {
  const options = { method: "GET", url: "https://estoque-api.herokuapp.com/exitProducts" };

  return axios
    .request(options)
    .then(function (response) {
        return response.data
    })
    .catch((error) => {
      toast.error("Ops, deu algum erro.");
    });
}

export default getAllExitProducts;
