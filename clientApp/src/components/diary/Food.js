import React from "react";
import FoodHtml from "./FoodHtml";
import FoodService from "../../services/FoodService";
import { connect } from "react-redux";

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
      }
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
  }

  async componentDidUpdate() {
    if (this.props.user.userId === "") {
    } else {
      const dailyTotal = await FoodService.selectTotalByUserId(
        this.props.user.userId
      );
      this.setState({ total: dailyTotal.data.Item, loading: false });
    }
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val });
  };

  searchFood = () => {
    this.props.history.push("/search");
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

export default connect(mapStateToProps)(Food);
