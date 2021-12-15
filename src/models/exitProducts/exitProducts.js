import axios from "axios";
import { toast } from "react-toastify";

export async function getAllExitProducts() {
  const options = {
    method: "GET",
    url: "https://estoque-api.herokuapp.com/exitProducts",
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

export async function addExitProducts({
  id,
  name,
  manufacturer,
  quantity,
  exitData,
  description,
}) {
  const options = {
    method: "POST",
    url: "https://estoque-api.herokuapp.com/exitProducts",
    headers: { "Content-Type": "application/json" },
    data: {
      id,
      name,
      manufacturer,
      quantity,
      exitData,
      description,
    },
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

export async function deletedExitProducts(id) {
  const options = {
    method: "DELETE",
    url: `https://estoque-api.herokuapp.com/exitProducts/${id}`,

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