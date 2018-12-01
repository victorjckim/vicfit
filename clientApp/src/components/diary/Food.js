import React from "react";
import FoodHtml from "./FoodHtml";
import FoodService from "../../services/FoodService";
import { connect } from "react-redux";
import { getMacros } from "../redux/UserActions";

class Food extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodArr: [],
      total: {
        TotalCalories: "",
        TotalCarbs: "",
        TotalFats: "",
        TotalProteins: ""
      },
      macros: {
        Calories: "",
        Carbs: "",
        Fats: "",
        Proteins: ""
      }
    };
  }

  componentDidMount() {
    if (this.props.user.userId === "") {
      this.setState({ loading: true });
    } else if (this.props.user.userId !== "") {
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate() {
    if (this.props.user.userId !== "" && this.state.macros.Calories === "") {
      await this.props.userMacros(this.props.user.userId);
      this.setState({ macros: this.props.user.macros }, () =>
        console.log(this.state)
      );
    } else if (
      this.props.user.userId !== "" &&
      this.state.total.TotalCalories === ""
    ) {
      const dailyTotal = await FoodService.selectTotalByUserId(
        this.props.user.userId
      );
      this.setState({ total: dailyTotal.data.Item, loading: false }, () =>
        console.log(this.state)
      );
    }
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val });
  };

  searchFood = evt => {
    this.props.history.push({
      pathname: "/search",
      state: { meal: evt.target.getAttribute("class") }
    });
  };

  render() {
    return (
      <React.Fragment>
        <FoodHtml
          {...this.state}
          onChange={this.onChange}
          searchFood={this.searchFood}
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
)(Food);
