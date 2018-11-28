import React from "react";

const ExerciseHtml = props => {
  return (
    <div className="col-lg-8 offset-lg-2">
      <div
        className="card"
        style={{ backgroundColor: "whitesmoke", opacity: "0.95" }}
      >
        <div className="card-header text-center">
          <font style={{ fontSize: "22pt", font: "helvetica" }}>
            Your Exercise Diary
          </font>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table" style={{ marginTop: "20px" }}>
              <tbody />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseHtml;
