import axios from "axios";
import { toast } from "react-toastify";


export async function getAllProducts() {
  const options = {
    method: "GET",
    url: "https://estoque-api.herokuapp.com/products",
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch((error) => {
      toast.error("Ops, deu algum erro.");
    });
}

export async function registerProducts(
  name,
  manufacturer,
  quantity,
  validationDate,
  description,
) {
  const options = {
    method: "POST",
    url: "https://estoque-api.herokuapp.com/products",
    headers: { "Content-Type": "application/json" },
    data: {
      name,
      manufacturer,
      quantity,
      validationDate,
      description,
    },
  };


  return axios
    .request(options)
    .then(function (response) {
      toast.success("Produto cadastrado com sucesso!");
      return response.data;
    })
    .catch(function (error) {
      toast.error("Ops, deu algum erro.");
    });
}
