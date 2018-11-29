import React from "react";
import Register from "../users/Register";
import Login from "../users/Login";
import { withRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Router from "../navigation/Router";
import "./Layout.css";
import { connect } from "react-redux";
import NavBar from "./NavBar";

class Layout extends React.Component {
  componentDidUpdate() {
    if (
      this.props.user.isLoggedIn &&
      this.props.location.pathname === "/login"
    ) {
      this.props.history.push("/profile");
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.user.isLoggedIn && (
          <React.Fragment>
            <NavBar />
            <div
              className="profileBackground"
              style={{
                backgroundImage: "url(assets/img/bg/shoes.jpg)"
              }}
            >
              <Router />
            </div>
          </React.Fragment>
        )}
        {!this.props.user.isLoggedIn && (
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={400}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  };
};

export default withRouter(connect(mapStateToProps)(Layout));
