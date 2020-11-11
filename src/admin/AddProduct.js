import React, { useState, useEffect } from "react";
import Layout from "./../core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

import { createProduct, getCategories } from "./apiAdmin";

export default function AddProduct() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    // photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (!!data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data.data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, formData, [name]: value });
  };

  const { user, token } = isAuthenticated();

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData)
      .then((data) => {
        if (!!data && data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            categories: [],
            category: "",
            shipping: "",
            quantity: "",
            photo: "",
            loading: false,
            error: "",
            createdProduct: data.name,
            redirectToProfile: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          //   value={price}
        >
          <option>Please Select</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select
          onChange={handleChange("shipping")}
          className="form-control"
          //   value={price}
        >
          <option>Please Select</option>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showSuccess = () => {
    if (createdProduct) {
      return <h2 className="alert alert-info">{createdProduct} is created</h2>;
    }
  };

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  const showLoading = () => {
    if (loading) {
      return <h2 className="alert alert-success">Loading...</h2>;
    }
  };

  return (
    <Layout
      title="Add a new product"
      description={`G'day ${user.name}, ready to add new product`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
}
