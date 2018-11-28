import React from "react";
import { Route } from "react-router-dom";
import Profile from "./navfiles/Profile";
import Food from "../diary/Food";
import Exercise from "../diary/Exercise";
import Dashboard from "./navfiles/Dashboard";
import SearchFood from "../diary/SearchFood";

const Router = props => {
  return (
    <React.Fragment>
      <div className="container-fluid flex-grow-1 container-p-y">
        <Route path="/profile" component={Profile} />
        <Route path="/dashboard" render={props => <Dashboard {...props} />} />
        <Route path="/food" component={Food} />
        <Route path="/search" component={SearchFood} />
        <Route path="/exercise" component={Exercise} />
      </div>
    </React.Fragment>
  );
};

export default Router;
