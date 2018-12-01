import React from "react";
import NutritionService from "../../services/NutritionService";
import SearchFoodHtml from "./SearchFoodHtml";
import { connect } from "react-redux";
import FoodService from "../../services/FoodService";
import moment from "moment";

class SearchFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      confirmAdd: false,
      foodArr: [],
      date: "",
      meal: "",
      nutrientObj: {
        foodName: "",
        calories: "",
        carbs: "",
        fats: "",
        proteins: "",
        date: "",
        userId: ""
      }
    };
  }

  componentDidMount() {
    this.setState({ meal: this.props.location.state.meal }, () =>
      console.log(this.state)
    );
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val });
  };

  searchFood = async () => {
    const searchResult = await NutritionService.searchFood(this.state.search);
    this.setState({ foodArr: searchResult.data.branded });
  };

  getNutrients = async evt => {
    const itemNutrients = await NutritionService.getNutrients(evt.target.id);
    const resp = itemNutrients.data.foods[0];
    const respObj = {
      meal: this.state.meal,
      foodName: resp.food_name,
      calories: resp.nf_calories,
      carbs: resp.nf_total_carbohydrate,
      fats: resp.nf_total_fat,
      proteins: resp.nf_protein,
      date: moment().format("YYYY-MM-DD"),
      userId: this.props.user.userId
    };
    this.setState({ confirmAdd: true, nutrientObj: respObj }, () =>
      console.log(this.state.nutrientObj)
    );
  };

  addFoodToDiary = async () => {
    await FoodService.create(this.state.nutrientObj)
      .then(resp => console.log(resp))
      .catch(err => console.error(err));
    this.props.history.push("/food");
  };

  cancelBack = () => {
    this.setState({ confirmAdd: false, nutrientObj: {} });
  };

  render() {
    return (
      <React.Fragment>
        <SearchFoodHtml
          {...this.state}
          onChange={this.onChange}
          searchFood={this.searchFood}
          getNutrients={this.getNutrients}
          cancelBack={this.cancelBack}
          addFoodToDiary={this.addFoodToDiary}
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

export default connect(mapStateToProps)(SearchFood);
