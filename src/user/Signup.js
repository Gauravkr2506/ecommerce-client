import { useState } from "react";
import { API } from "./../config";
import Layout from "./../core/Layout";

const Signup = () => {
  const [values, setValues] = useState({
    name: "Gaurav",
    email: "gaurav@gmail.com",
    password: "smallbang8",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          // name: "",
          // email: "",
          // password: "",
          // error: "",
          success: true,
        });
      }
    });
  };

  const signup = (user) => {
    return fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New Account is created. Please signin
    </div>
  );

  const sigUpForm = () => (
    <form>
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
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="text"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
  return (
    <Layout
      title="Signup Page"
      description="Node React Ecommerce"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {sigUpForm()}
    </Layout>
  );
};

export default Signup;
