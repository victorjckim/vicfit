import React from "react";
import DashboardHtml from "./DashboardHtml";
import { connect } from "react-redux";
import { getId, getMacros } from "../../redux/UserActions";
import ProfileService from "../../../services/ProfileService";
import MacrosService from "../../../services/MacrosService";
import ArticleService from "../../../services/ArticleService";
import FoodService from "../../../services/FoodService";
import moment from "moment";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      macros: {
        Calories: ""
      },
      profile: {
        CurrentWeight: "",
        GoalWeight: ""
      },
      currentWeight: "",
      articleArr: [],
      consumedCalories: ""
    };
  }

  async componentDidMount() {
    await this.props.getUserId(this.props.user.userName);
    const profile = await ProfileService.selectByUserId(this.props.user.userId);
    if (profile.data.Item === null) {
      this.props.history.push("/profile");
    } else {
      const articles = await ArticleService.getArticles();
      this.setState({ articleArr: articles.data.Items });
      this.setState({
        macros: this.props.user.macros,
        profile: profile.data.Item
      });
    }
    const dailyTotal = await FoodService.selectTotalByUserId(
      this.props.user.userId
    );
    if (dailyTotal.data.Item.Date === moment().format("YYYY-MM-DD")) {
      this.setState({ consumedCalories: dailyTotal.data.Item.TotalCalories });
    }
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val });
  };

  addRequest = () => {
    this.props.history.push("/food");
  };

  exerciseRequest = () => {
    this.props.history.push("/exercise");
  };

  updateWeight = async () => {
    const dataObj = {
      currentWeight: this.state.currentWeight,
      goalWeight: this.state.profile.GoalWeight,
      profileId: this.state.macros.ProfileId
    };
    await ProfileService.update(dataObj, this.props.user.userId)
      .then(resp => console.log(resp))
      .catch(err => console.error(err));
    const newMacros = await MacrosService.getMacros(this.props.user.userId);
    this.setState({
      macros: newMacros.data.Item,
      profile: {
        CurrentWeight: dataObj.currentWeight,
        GoalWeight: dataObj.goalWeight
      },
      currentWeight: ""
    });
  };

  render() {
    return (
      <React.Fragment>
        <DashboardHtml
          {...this.state}
          addRequest={this.addRequest}
          exerciseRequest={this.exerciseRequest}
          onChange={this.onChange}
          updateWeight={this.updateWeight}
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
    userMacros: async userId => {
      await dispatch(getMacros(userId))
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
