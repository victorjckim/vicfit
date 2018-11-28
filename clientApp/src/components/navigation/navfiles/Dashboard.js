import React from "react";
import DashboardHtml from "./DashboardHtml";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          addRequest={this.addRequest}
          exerciseRequest={this.exerciseRequest}
        />
      </React.Fragment>
    );
  }
}

export default Dashboard;
