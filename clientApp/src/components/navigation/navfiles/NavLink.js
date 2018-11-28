import React from "react";
import { withRouter, Link } from "react-router-dom";

const NavLink = props => {
  const isActive = path => {
    const pathSplit = path.split("/");
    const locationSplit = props.location.pathname.split("/");
    if (pathSplit.length >= 3) {
      return pathSplit[1] === locationSplit[1] &&
        pathSplit[2] === locationSplit[2]
        ? " active"
        : "";
    }
    return pathSplit[1] === locationSplit[1] ? " active" : "";
  };

  return (
    <li className={`nav-item${isActive(props.path)}`}>
      <Link to={props.path} className="nav-link">
        <div>{props.label}</div>
      </Link>
    </li>
  );
};

export default withRouter(NavLink);
