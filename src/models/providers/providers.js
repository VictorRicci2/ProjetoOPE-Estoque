import axios from "axios";
import { toast } from "react-toastify";

export async function getAllProviders() {
  const options = {
    method: "GET",
    url: "https://estoque-api.herokuapp.com/providers",
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

export async function registerProviders(name, email, cellphone) {
  const options = {
    method: "POST",
    url: "https://estoque-api.herokuapp.com/providers",
    headers: { "Content-Type": "application/json" },
    data: {
      name,
      email,
      cellphone,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      toast.success("Fornecedor cadastrado com sucesso!");
      return response.data;
    })
    .catch(function (error) {
      toast.error("Ops, deu algum erro.");
    });
}

export async function updateProviders(id, name, email, cellphone) {
  const options = {
    method: "PUT",
    url: `https://estoque-api.herokuapp.com/providers/${id}`,
    headers: { "Content-Type": "application/json" },
    data: {
      name,
      email,
      cellphone,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      toast.success("Fornecedor editado com sucesso!");
      return response.data
    })
    .catch(function (error) {
      toast.error("Ops, deu algum erro.");
    });
}

export async function deleteProviders(id) {
  const options = {
    method: "DELETE",
    url: `https://estoque-api.herokuapp.com/providers/${id}`,
    headers: { "Content-Type": "application/json" },
  };

  axios
    .request(options)
    .then(function (response) {
      toast.success("Fornecedor excluído com sucesso!");
      return response.data
    })
    .catch(function (error) {
      toast.error("Ops, deu algum erro.");
    });
}
