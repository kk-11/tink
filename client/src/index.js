import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Callback } from "../src/components/Callback";
import { Main } from "../src/components/Main";

import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/callback" component={Callback} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
