import React from "react";
import "./Diary.css";
import moment from "moment";

const FoodHtml = props => {
  const breakfast = props.todaysFoodArr.filter(
    food => food.Meal === "Breakfast"
  );
  const lunch = props.todaysFoodArr.filter(food => food.Meal === "Lunch");
  const dinner = props.todaysFoodArr.filter(food => food.Meal === "Dinner");
  const snacks = props.todaysFoodArr.filter(food => food.Meal === "Snacks");
  console.log(snacks);
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
                  <td />
                </tr>
                {breakfast.length === 0 ? (
                  <tr>
                    <td>Breakfast</td>
                  </tr>
                ) : (
                  breakfast.map((food, index) => {
                    if (index === 0) {
                      return (
                        <tr key={index}>
                          <td>Breakfast</td>
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={index}>
                          <td />
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  })
                )}
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
                  <td />
                </tr>
                {lunch.length === 0 ? (
                  <tr>
                    <td>Lunch</td>
                  </tr>
                ) : (
                  lunch.map((food, index) => {
                    if (index === 0) {
                      return (
                        <tr key={index}>
                          <td>Lunch</td>
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={index}>
                          <td />
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  })
                )}
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
                  <td />
                </tr>
                {dinner.length === 0 ? (
                  <tr>
                    <td>Dinner</td>
                  </tr>
                ) : (
                  dinner.map((food, index) => {
                    if (index === 0) {
                      return (
                        <tr key={index}>
                          <td>Dinner</td>
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={index}>
                          <td />
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  })
                )}
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
                  <td />
                </tr>
                {snacks.length === 0 ? (
                  <tr>
                    <td>Snacks</td>
                  </tr>
                ) : (
                  snacks.map((food, index) => {
                    if (index === 0) {
                      return (
                        <tr key={index}>
                          <td>Snacks</td>
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={index}>
                          <td />
                          <td>{food.FoodName}</td>
                          <td>{food.Calories}</td>
                          <td>{food.Carbs}g</td>
                          <td>{food.Fats}g</td>
                          <td>{food.Proteins}g</td>
                          <td>
                            <span onClick={props.deleteFood}>
                              <i
                                id={food.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  })
                )}
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
                  <td />
                </tr>
                <tr className="total" style={{ borderTop: "4px solid" }}>
                  {/* Totals calculated from the foods eaten that day */}
                  <td className="first">Totals</td>
                  <td />
                  {props.total.Date === moment().format("YYYY-MM-DD") ? (
                    <React.Fragment>
                      <td>{props.total.TotalCalories}</td>
                      <td>{props.total.TotalCarbs}g</td>
                      <td>{props.total.TotalFats}g</td>
                      <td>{props.total.TotalProteins}g</td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td>0</td>
                      <td>0g</td>
                      <td>0g</td>
                      <td>0g</td>
                    </React.Fragment>
                  )}
                  <td />
                </tr>
                <tr className="total">
                  {/* Daily Goal will come from the database */}
                  <td className="first">Daily Goal</td>
                  <td />
                  <td>{props.macros.Calories}</td>
                  <td>{props.macros.Carbs}g</td>
                  <td>{props.macros.Fats}g</td>
                  <td>{props.macros.Proteins}g</td>
                  <td />
                </tr>
                <tr className="total">
                  {/* Remaining will be calculated from the foods on that specific day*/}
                  <td className="first">Remaining</td>
                  <td />
                  {props.total.Date === moment().format("YYYY-MM-DD") ? (
                    <React.Fragment>
                      <td>
                        {props.macros.Calories - props.total.TotalCalories}
                      </td>
                      <td>{props.macros.Carbs - props.total.TotalCarbs}g</td>
                      <td>{props.macros.Fats - props.total.TotalFats}g</td>
                      <td>
                        {props.macros.Proteins - props.total.TotalProteins}g
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td>{props.macros.Calories}</td>
                      <td>{props.macros.Carbs}g</td>
                      <td>{props.macros.Fats}g</td>
                      <td>{props.macros.Proteins}g</td>
                    </React.Fragment>
                  )}
                  <td />
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
