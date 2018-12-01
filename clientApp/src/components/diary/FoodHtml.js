import React from "react";
import "./Diary.css";

const FoodHtml = props => {
  return (
    <div className="col-lg-8 offset-lg-2">
      <div
        className="card"
        style={{ backgroundColor: "whitesmoke", opacity: "0.95" }}
      >
        <div className="card-header text-center">
          <font style={{ fontSize: "22pt", font: "helvetica" }}>
            Your Food Diary
          </font>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table" style={{ marginTop: "20px" }}>
              <tbody>
                <tr
                  className="header"
                  style={{ borderBottom: "4px solid", borderTop: "4px solid" }}
                >
                  <td />
                  <td>Food Name</td>
                  <td>Calories</td>
                  <td>Carbs</td>
                  <td>Fat</td>
                  <td>Protein</td>
                </tr>
                <tr className="header">
                  <td>Breakfast</td>
                </tr>
                <tr>
                  <td>
                    <span className="Breakfast" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                {props.todaysFoodArr.map((food, index) => {
                  if (food.Meal === "Breakfast") {
                    return (
                      <tr key={index}>
                        <td />
                        <td>{food.FoodName}</td>
                        <td>{food.Calories}</td>
                        <td>{food.Carbs}g</td>
                        <td>{food.Fats}g</td>
                        <td>{food.Proteins}g</td>
                      </tr>
                    );
                  } else {
                    return "";
                  }
                })}
                <tr className="header">
                  <td>Lunch</td>
                </tr>
                <tr>
                  <td>
                    <span className="Lunch" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                {props.todaysFoodArr.map((food, index) => {
                  if (food.Meal === "Lunch") {
                    return (
                      <tr key={index}>
                        <td />
                        <td>{food.FoodName}</td>
                        <td>{food.Calories}</td>
                        <td>{food.Carbs}g</td>
                        <td>{food.Fats}g</td>
                        <td>{food.Proteins}g</td>
                      </tr>
                    );
                  } else {
                    return "";
                  }
                })}
                <tr className="header">
                  <td>Dinner</td>
                </tr>
                <tr>
                  <td>
                    <span className="Dinner" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                {props.todaysFoodArr.map((food, index) => {
                  if (food.Meal === "Dinner") {
                    return (
                      <tr key={index}>
                        <td />
                        <td>{food.FoodName}</td>
                        <td>{food.Calories}</td>
                        <td>{food.Carbs}g</td>
                        <td>{food.Fats}g</td>
                        <td>{food.Proteins}g</td>
                      </tr>
                    );
                  } else {
                    return "";
                  }
                })}
                <tr className="header">
                  <td>Snacks</td>
                </tr>
                <tr>
                  <td>
                    <span className="Snacks" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                {props.todaysFoodArr.map((food, index) => {
                  if (food.Meal === "Snacks") {
                    return (
                      <tr key={index}>
                        <td />
                        <td>{food.FoodName}</td>
                        <td>{food.Calories}</td>
                        <td>{food.Carbs}g</td>
                        <td>{food.Fats}g</td>
                        <td>{food.Proteins}g</td>
                      </tr>
                    );
                  } else {
                    return "";
                  }
                })}
                <tr className="total" style={{ borderTop: "4px solid" }}>
                  {/* Totals calculated from the foods eaten that day */}
                  <td className="first">Totals</td>
                  <td />
                  <td>{props.total.TotalCalories}</td>
                  <td>{props.total.TotalCarbs}g</td>
                  <td>{props.total.TotalFats}g</td>
                  <td>{props.total.TotalProteins}g</td>
                </tr>
                <tr className="total">
                  {/* Daily Goal will come from the database */}
                  <td className="first">Daily Goal</td>
                  <td />
                  <td>{props.macros.Calories}</td>
                  <td>{props.macros.Carbs}g</td>
                  <td>{props.macros.Fats}g</td>
                  <td>{props.macros.Proteins}g</td>
                </tr>
                <tr className="total">
                  {/* Remaining will be calculated from the foods on that specific day*/}
                  <td className="first">Remaining</td>
                  <td />
                  <td>{props.macros.Calories - props.total.TotalCalories}</td>
                  <td>{props.macros.Carbs - props.total.TotalCarbs}g</td>
                  <td>{props.macros.Fats - props.total.TotalFats}g</td>
                  <td>{props.macros.Proteins - props.total.TotalProteins}g</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodHtml;
