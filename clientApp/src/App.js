import React, { Component } from "react";
import "./App.css";
import Layout from "./components/navigation/Layout";
import { connect } from "react-redux";
import { loginStatus } from "../src/components/redux/UserActions";
import { withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.currentUser();
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
    currentUser: () => {
      dispatch(loginStatus())
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
