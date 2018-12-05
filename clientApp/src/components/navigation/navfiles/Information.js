import React from "react";
import InformationHtml from "./InformationHtml";
import ProfileService from "../../../services/ProfileService";
import { connect } from "react-redux";
import {
  NotificationManager,
  NotificationContainer
} from "react-notifications";

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalId: "",
      selectedOption: ""
    };
  }

  async componentDidMount() {
    const options = [
      { value: "", label: "Select..." },
      { value: 1, label: "Lose weight" },
      { value: 2, label: "Gain muscle" },
      { value: 3, label: "I'm a beginner, so give me both!" }
    ];
    if (this.state.goalId === "") {
      const profile = await ProfileService.selectByUserId(
        this.props.user.userId
      );
      this.setState(
        {
          goalId: profile.data.Item.GoalId,
          selectedOption: options[profile.data.Item.GoalId]
        },
        () => console.log(this.state)
      );
    }
  }

  async componentDidUpdate() {
    const options = [
      { value: "", label: "Select..." },
      { value: 1, label: "Lose weight" },
      { value: 2, label: "Gain muscle" },
      { value: 3, label: "I'm a beginner, so give me both!" }
    ];
    if (this.state.goalId === "") {
      const profile = await ProfileService.selectByUserId(
        this.props.user.userId
      );
      this.setState(
        {
          goalId: profile.data.Item.GoalId,
          selectedOption: options[profile.data.Item.GoalId]
        },
        () => console.log(this.state)
      );
    }
  }

  onGoalChange = evt => {
    console.log(evt);
    this.setState({ goalId: evt.value, selectedOption: evt }, () =>
      console.log(this.state)
    );
  };

  updateGoal = async () => {
    const dataObj = {
      goalId: this.state.goalId,
      profileId: this.props.user.macros.ProfileId
    };
    await ProfileService.updateGoal(dataObj, this.props.user.userId)
      .then(resp => {
        console.log(resp);
        NotificationManager.success("", "Profile Saved");
      })
      .catch(err => {
        console.error(err);
        NotificationManager.error("Please try again", "Save was unsuccessful");
      });
  };

  render() {
    return (
      <React.Fragment>
        <InformationHtml
          {...this.state}
          onGoalChange={this.onGoalChange}
          updateGoal={this.updateGoal}
          username={this.props.user.userName}
        />
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

export default connect(mapStateToProps)(Information);
