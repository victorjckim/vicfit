import React from "react";
import FoodHtml from "./FoodHtml";
import FoodService from "../../services/FoodService";
import { connect } from "react-redux";
import { getMacros } from "../redux/UserActions";
import moment from "moment";
import LoadingAnimation from "./LoadingAnimation";

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
      todaysFoodArr: []
    };
  }

  async componentDidMount() {
    this.showLoadingModal();
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
      const todaysFood = await FoodService.selectFoodsByUserId(
        this.props.user.userId,
        moment().format("YYYY-MM-DD")
      );
      this.setState(
        {
          todaysFoodArr: todaysFood.data.Items,
          total: dailyTotal.data.Item,
          loading: false
        },
        () => console.log(this.state)
      );
    }
    this.closeLoadingModal();
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
      this.props.user.userId
    );
    const updateFood = await FoodService.selectFoodsByUserId(
      this.props.user.userId,
      moment().format("YYYY-MM-DD")
    );
    this.setState({
      todaysFoodArr: updateFood.data.Items,
      total: dailyTotal.data.Item
    });
  };

  showLoadingModal = () => {
    this.showLoading.click();
  };

  closeLoadingModal = () => {
    this.closeLoading.click();
  };

  render() {
    const loadingModal = (
      <div
        className="modal fade show"
        id="modals-loading"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog">
          <form className="modal-content">
            <button
              type="button"
              className="modalShow"
              data-toggle="modal"
              data-target="#modals-loading"
              ref={modal => (this.showLoading = modal)}
            >
              Show
            </button>
            <button
              type="button"
              className="close modalShow"
              data-dismiss="modal"
              aria-label="Close"
              ref={modal => (this.closeLoading = modal)}
            >
              Close
            </button>
          </form>
        </div>
        <LoadingAnimation />
      </div>
    );
    return (
      <React.Fragment>
        <FoodHtml
          {...this.state}
          onChange={this.onChange}
          searchFood={this.searchFood}
          deleteFood={this.deleteFood}
        />
        {loadingModal}
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
