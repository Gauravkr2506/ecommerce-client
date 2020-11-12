import { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";
import { getProducts } from "./apiCore";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

export default function Checkout({ products }) {
  const getTotal = () => {
    return products.reduce((a, v) => {
      return a + v.count * v.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Signin to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckout()}
    </div>
  );
}
