import React, { Fragment, FunctionComponent, useContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { UserContext, UserContextProvider } from "./contexts/UserContext";
// import App from "./App";
import { Feed } from "./pages/Feed";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navigation } from "./particles/Navigation";

const Main: FunctionComponent = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Fragment>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <UserContextProvider value={[user, setUser]}>
            <Route exact path="/" component={App} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </UserContextProvider>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default Main;
