import React from "react";
import { Route, Switch } from "react-router-dom";
import { Callback } from "./Callback";
import { Main } from "./Main";

export const App = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/callback" component={Callback} />
  </Switch>
);

export default App;
