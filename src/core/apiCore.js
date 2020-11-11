import { API } from "./../config";

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy${sortBy}&order=desc&limit=6`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      //   Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log(err);
    });
};
