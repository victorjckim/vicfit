import React from "react";
import "./Layout.css";
import NavLink from "./navfiles/NavLink";

const NavBar = props => {
  return (
    <React.Fragment>
      <nav
        className="layout-navbar navbar navbar-expand-lg align-items-lg-center bg-danger-darker navbar-dark container-p-x"
        id="layout-navbar"
      >
        <div className="navbar-brand mb-1">VicFit</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#layout-navbar-collapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="navbar-collapse collapse" id="layout-navbar-collapse">
          <div className="navbar-nav align-items-lg-center">
            <NavLink path="/dashboard" label="Dashboard" />
            <NavLink path="/food" label="Food" />
            <NavLink path="/exercise" label="Exercise" />
            <li className="nav-item logout" onClick={props.logout}>
              <div className="nav-link">
                <div>Logout</div>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
