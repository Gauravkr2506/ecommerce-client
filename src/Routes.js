import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
// import Menu from "./core/Menu";

export default function Routes() {
  return (
    <BrowserRouter>
      {/* <Menu /> */}
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
