import { useState, useEffect } from "react";

import Layout from "./Layout";
import Card from "./Card";
import Search from "./Search";

import { getProducts } from "./apiCore";
const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (!!data && data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (!!data && data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
  }, []);

  return (
    <Layout
      title="Home Page"
      description="Node React Ecommerce"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productBySell.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card product={product} showViewProductButton={true} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">New Arrivals</h2>

      <div className="row">
        {productByArrival.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card product={product} showViewProductButton={true} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
