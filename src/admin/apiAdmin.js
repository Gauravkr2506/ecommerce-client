import { API } from "./../config";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = (userId, token, product) => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};