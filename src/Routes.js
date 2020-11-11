import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Home from "./core/Home";
// import Menu from "./core/Menu";

export default function Routes() {
  return (
    <BrowserRouter>
      {/* <Menu /> */}
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
