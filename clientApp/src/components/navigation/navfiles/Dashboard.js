import React from "react";
import DashboardHtml from "./DashboardHtml";
import { connect } from "react-redux";
import { getId, getMacros } from "../../redux/UserActions";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.user.userId === "") {
      this.props.getUserId(this.props.user.userName);
    } else {
      this.props.getMacros(this.props.user.userId);
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
    getUserId: email => {
      dispatch(getId(email))
        .then(resp => {
          dispatch(getMacros(resp.value.data.Item))
            .then(resp => console.log(resp))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
