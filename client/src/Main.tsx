import React, { Fragment, FunctionComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { Feed } from "./pages/Feed";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navigation } from "./particles/Navigation";

const Main: FunctionComponent<{}> = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navigation />
        <Switch>
          {/* <Route exact path="/home" component={Home} /> */}
          <Route exact path="/feed" component={Feed} />
          <Route exact path="/react" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default Main;
