import React, { Component } from "react";
import "./App.css";
import Layout from "./components/navigation/Layout";
import { connect } from "react-redux";
import { loginStatus } from "../src/components/redux/UserActions";
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem("token");
    this.props.currentUser(token);
  }

  render() {
    return (
      <div className="App">
        <Layout />
      </div>
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
    currentUser: data => {
      dispatch(loginStatus(data))
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
