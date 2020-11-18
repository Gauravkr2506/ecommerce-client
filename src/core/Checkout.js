import { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";
import { getProducts } from "./apiCore";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {
  getBrainTreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";

export default function Checkout({ products }) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBrainTreeClientToken(userId, token)
      .then((response) => {
        if (!!response && response.error) {
          setData({ ...data, error: response.error });
        } else {
          setData({ clientToken: response.clientToken });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((a, v) => {
      return a + v.count * v.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Signin to checkout</button>
      </Link>
    );
  };

  const buy = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((buy_data) => {
        console.log(buy_data);
        nonce = buy_data.nonce;

        // console.log(
        //   "send nonce and total to process:",
        //   nonce,
        //   getTotal(products)
        // );

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            const createOrderData = {
              products: products,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
              address: data.address,
            };

            createOrder(userId, token, createOrderData).then(
              (createOrderData) => {
                setData({ ...data, success: response.success });
                emptyCart(() => {
                  console.log("payment success and empty cart");
                  setData({ ...data, loading: false, success: true });
                });
              }
            );
          })
          .catch((err) => {
            console.log(err);
            setData({ loading: false });
          });
      })
      .catch((err) => {
        console.log("dropin error", err);
        setData({ ...data, error: err.message });
      });
  };

  const handleAddress = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <div className="gorm-group mb-3">
              <label className="text-muted">Delivery address:</label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here..."
              ></textarea>
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button onClick={buy} className="btn btn-success btn-block">
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const showError = (error) => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = (success) => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        Thanks! Your payment was successful
      </div>
    );
  };

  const showLoading = (loading) => {
    return (
      <h2
        // className="alert alert-info"
        style={{ display: loading ? "" : "none" }}
      >
        Loading...
      </h2>
    );
  };

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
    </div>
  );
}
