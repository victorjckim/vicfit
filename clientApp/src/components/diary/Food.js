import React from "react";
import FoodHtml from "./FoodHtml";

class Food extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodArr: []
    };
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

export default Food;
