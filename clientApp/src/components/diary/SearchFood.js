import React from "react";
import NutritionService from "../../services/NutritionService";
import SearchFoodHtml from "./SearchFoodHtml";

class SearchFood extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      confirmAdd: false,
      foodArr: [],
      nutrientObj: {
        calories: "",
        carbs: "",
        fats: "",
        proteins: ""
      }
    };
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val });
  };

  searchFood = async () => {
    const searchResult = await NutritionService.searchFood(this.state.search);
    this.setState({ foodArr: searchResult.data.branded }, () =>
      console.log("Food Arr set", this.state.foodArr)
    );
  };

  getNutrients = async evt => {
    const itemNutrients = await NutritionService.getNutrients(evt.target.id);
    const resp = itemNutrients.data.foods[0];
    const respObj = {
      calories: resp.nf_calories,
      carbs: resp.nf_total_carbohydrate,
      fats: resp.nf_total_fat,
      proteins: resp.nf_protein
    };
    this.setState({ confirmAdd: true, nutrientObj: respObj });
    console.log(itemNutrients.data.foods[0]);
  };

  addFoodToDiary = () => {
    this.setState(
      {
        confirmAdd: false,
        foodArr: [],
        nutrientObj: {},
        search: ""
      },
      () => this.props.history.push("/food")
    );
  };

  cancelBack = () => {
    this.setState({ confirmAdd: false, nutrientObj: {} });
    // use to reset state on click of cancel
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

export default SearchFood;
