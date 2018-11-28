import React from "react";
import Register from "../users/Register";
import Login from "../users/Login";
import { withRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Router from "../navigation/Router";
import "./Layout.css";
import NavBar from "./NavBar";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  loginSuccess = () => {
    this.setState({ loggedIn: true }, () =>
      this.props.history.push("/profile")
    );
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.loggedIn && (
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={400}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route
                      exact
                      path="/"
                      render={props => <Register {...props} />}
                    />
                    <Route
                      path="/login"
                      render={props => (
                        <Login {...props} loginSuccess={this.loginSuccess} />
                      )}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        )}
        {this.state.loggedIn && (
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
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
