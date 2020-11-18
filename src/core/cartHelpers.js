import Product from "./Product";

export const addItem = (item, next) => {
  let cart = [];
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      ...item,
      count: 1,
    });

    cart = cart
      .reverse()
      .filter((itm, i, a) => i === a.findIndex((item) => item._id == itm._id));

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    next();
  }
};

export const itemTotal = () => {
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      return cart.reduce((a, v) => a + v.count, 0);
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      return cart;
    }
  }
  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, index) => {
      if (product._id === productId) {
        cart[index].count = +count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window != "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, index) => {
      if (product._id === productId) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};

export const emptyCart = (next) => {
  let cart = [];
  if (typeof window != "undefined") {
    localStorage.removeItem("cart");
    next();
  }

  return cart;
};
