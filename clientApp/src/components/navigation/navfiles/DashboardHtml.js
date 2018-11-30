import React from "react";

const DashboardHtml = props => {
  console.log(props);
  return (
    <div className="col-lg-8 offset-lg-2">
      <div
        className="card"
        style={{ backgroundColor: "whitesmoke", opacity: "0.95" }}
      >
        <div className="card-header text-center">
          <font style={{ fontSize: "22pt", font: "helvetica" }}>
            Your Daily Summary
          </font>
        </div>
        <div className="card-body">
          <div className="row" style={{ margin: "12px" }}>
            <div className="col-md-2 col-lg-2 text-center">
              <img src="assets/img/bg/default.jpg" alt="" height={80} />
            </div>
            <div
              className="col-md-4 col-lg-3 mt-4 text-center"
              style={{ position: "relative", bottom: "1px" }}
            >
              <font style={{ fontSize: "18pt", color: "maroon" }}>
                Calories Left:{" "}
                {props.macros.Calories === ""
                  ? "Waiting..."
                  : props.macros.Calories}
              </font>
            </div>
            <div className="col-md-3 offset-lg-1 mt-4">
              <button
                type="button"
                className="btn btn-outline-primary btn-block"
                onClick={props.addRequest}
              >
                Add Food
              </button>
            </div>
            <div className="col-md-3 mt-4">
              <button
                type="button"
                className="btn btn-outline-dark btn-block"
                onClick={props.exerciseRequest}
              >
                Add Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHtml;
