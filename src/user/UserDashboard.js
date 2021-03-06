import React from "react";
import { isAuthenticated } from "../auth";
import Layout from "./../core/Layout";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/profile/update">
              Update profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => (
    <div className="card mb-5">
      <div className="card-header">User Information</div>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">
          {role === 1 ? "Admin" : "Registered User"}
        </li>
      </ul>
    </div>
  );

  const purchaseHistory = () => (
    <div className="card mb-5">
      <div className="card-header">Purchase History</div>

      <ul className="list-group">
        <li className="list-group-item">history</li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
}
