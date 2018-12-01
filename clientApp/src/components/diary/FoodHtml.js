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
                    <span className="add" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr className="header">
                  <td>Lunch</td>
                </tr>
                <tr>
                  <td>
                    <span className="add" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr className="header">
                  <td>Dinner</td>
                </tr>
                <tr>
                  <td>
                    <span className="add" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
                <tr className="header">
                  <td>Snacks</td>
                </tr>
                <tr>
                  <td>
                    <span className="add" onClick={props.searchFood}>
                      Add Food
                    </span>
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>

                <tr className="total" style={{ borderTop: "4px solid" }}>
                  <td className="first">Totals</td>
                  {/* Totals calculated from the foods eaten that day */}
                  <td>
                    {props.total.TotalCalories === ""
                      ? ""
                      : props.total.TotalCalories}
                  </td>
                  <td>
                    {props.total.TotalCarbs === ""
                      ? ""
                      : props.total.TotalCarbs}
                  </td>
                  <td>
                    {props.total.TotalFats === "" ? "" : props.total.TotalFats}
                  </td>
                  <td>
                    {props.total.TotalProteins === ""
                      ? ""
                      : props.total.TotalProteins}
                  </td>
                </tr>
                <tr className="total">
                  {/* Daily Goal will come from the database */}
                  <td className="first">Daily Goal</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr className="total">
                  {/* Remaining will be calculated from the foods on that specific day*/}
                  <td className="first">Remaining</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
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
