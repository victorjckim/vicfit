import React from "react";
import DashboardHtml from "./DashboardHtml";
import { connect } from "react-redux";
import { getId, getMacros } from "../../redux/UserActions";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      macros: {
        Calories: ""
      }
    };
  }

  async componentDidMount() {
    if (this.props.user.userId === "") {
      await this.props.getUserId(this.props.user.userName);
      this.setState({ macros: this.props.user.macros }, () =>
        console.log(this.state)
      );
    } else {
      await this.props.userMacros(this.props.user.userId);
    }
  }

  addRequest = () => {
    this.props.history.push("/food");
  };

  exerciseRequest = () => {
    this.props.history.push("/exercise");
  };

  render() {
    return (
      <React.Fragment>
        <DashboardHtml
          {...this.state}
          addRequest={this.addRequest}
          exerciseRequest={this.exerciseRequest}
        />
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
        .then(async resp => {
          await dispatch(getMacros(resp.value.data.Item))
            .then(resp => console.log(resp))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    },
    userMacros: userId => {
      dispatch(getMacros(userId))
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
