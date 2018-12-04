import React from "react";
import Register from "../users/Register";
import Login from "../users/Login";
import { withRouter, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Router from "../navigation/Router";
import "./Layout.css";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import ProfileService from "../../services/ProfileService";
import { getId, logoutUser } from "../redux/UserActions";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

class Layout extends React.Component {
  async componentDidUpdate() {
    if (
      this.props.user.isLoggedIn &&
      this.props.location.pathname === "/login"
    ) {
      await this.props.getUserId(this.props.user.userName);
      const profile = await ProfileService.selectByUserId(
        this.props.user.userId
      );
      if (profile.data.Item !== null) {
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/profile");
      }
    } else if (
      !this.props.user.isLoggedIn &&
      this.props.location.pathname === "/dashboard"
    ) {
      this.props.history.push("/login");
    }
  }

  successNote = () => {
    NotificationManager.success(
      "Please login to continue",
      "User registered successfully!"
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.user.isLoggedIn && (
          <React.Fragment>
            {this.props.location.pathname !== "/profile" && (
              <React.Fragment>
                <NavBar logout={this.props.logout} />
                <div
                  className="siteBackground"
                  style={{
                    backgroundImage: "url(assets/img/bg/shoes.jpg)"
                  }}
                >
                  <Router />
                </div>
              </React.Fragment>
            )}
            {this.props.location.pathname === "/profile" && (
              <React.Fragment>
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
        )}
        {!this.props.user.isLoggedIn && (
          <React.Fragment>
            <Route
              render={({ location }) => (
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    timeout={400}
                    classNames="fade"
                  >
                    <Switch location={location}>
                      {/* <Route exact path="/" component={Register} /> */}
                      <Route
                        exact
                        path="/"
                        render={props => (
                          <Register successNote={this.successNote} />
                        )}
                      />
                      <Route path="/login" component={Login} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </React.Fragment>
        )}
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserId: async email => {
      await dispatch(getId(email))
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
    },
    logout: async () => {
      await dispatch(logoutUser())
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
