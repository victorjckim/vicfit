import React from "react";
import FoodHtml from "./FoodHtml";
import FoodService from "../../services/FoodService";
import ExerciseService from "../../services/ExerciseService";
import { connect } from "react-redux";
import { getMacros } from "../redux/UserActions";
import moment from "moment";
// import LoadingAnimation from "./LoadingAnimation";

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
      },
      todaysFoodArr: [],
      caloriesBurned: ""
    };
  }

  async componentDidMount() {
    await this.props.userMacros(sessionStorage.getItem("userId"));
    this.setState({ macros: this.props.user.macros });
    const dailyTotal = await FoodService.selectTotalByUserId(
      sessionStorage.getItem("userId")
    );
    const todaysFood = await FoodService.selectFoodsByUserId(
      sessionStorage.getItem("userId"),
      moment().format("YYYY-MM-DD")
    );
    const exerciseTotal = await ExerciseService.selectTotalByUserId(
      sessionStorage.getItem("userId")
    );
    this.setState({
      todaysFoodArr: todaysFood.data.Items,
      total: dailyTotal.data.Item,
      caloriesBurned: exerciseTotal.data.Item.CaloriesBurned,
      loading: false
    });
    // this.closeLoadingModal();
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

  deleteFood = async evt => {
    const deleteEntry = await FoodService.delete(evt.target.id);
    console.log(deleteEntry);
    const dailyTotal = await FoodService.selectTotalByUserId(
      sessionStorage.getItem("userId")
    );
    const updateFood = await FoodService.selectFoodsByUserId(
      sessionStorage.getItem("userId"),
      moment().format("YYYY-MM-DD")
    );
    this.setState({
      todaysFoodArr: updateFood.data.Items,
      total: dailyTotal.data.Item
    });
  };

  // showLoadingModal = () => {
  //   this.showLoading.click();
  // };

  // closeLoadingModal = () => {
  //   this.closeLoading.click();
  // };

  render() {
    // const loadingModal = (
    //   <div
    //     className="modal fade show"
    //     id="modals-loading"
    //     data-backdrop="static"
    //     data-keyboard="false"
    //   >
    //     <div className="modal-dialog">
    //       <form className="modal-content">
    //         <button
    //           type="button"
    //           className="modalShow"
    //           data-toggle="modal"
    //           data-target="#modals-loading"
    //           ref={modal => (this.showLoading = modal)}
    //         >
    //           Show
    //         </button>
    //         <button
    //           type="button"
    //           className="close modalShow"
    //           data-dismiss="modal"
    //           aria-label="Close"
    //           ref={modal => (this.closeLoading = modal)}
    //         >
    //           Close
    //         </button>
    //       </form>
    //     </div>
    //     <LoadingAnimation />
    //   </div>
    // );
    return (
      <React.Fragment>
        <FoodHtml
          {...this.state}
          onChange={this.onChange}
          searchFood={this.searchFood}
          deleteFood={this.deleteFood}
        />
        {/* {loadingModal} */}
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
