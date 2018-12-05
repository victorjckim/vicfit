import React from "react";
import Select from "react-select";

const InformationHtml = props => {
  const options = [
    { value: "", label: "Select..." },
    { value: 1, label: "Lose weight" },
    { value: 2, label: "Gain muscle" },
    { value: 3, label: "I'm a beginner, so give me both!" }
  ];
  return (
    <React.Fragment>
      <div className="col-lg-8 offset-lg-2">
        <div
          className="card"
          style={{ backgroundColor: "whitesmoke", opacity: "0.95" }}
        >
          <div className="card-header text-center">
            <font style={{ fontSize: "22pt", font: "helvetica" }}>Profile</font>
          </div>
          <div className="card-body col-md-12 media">
            <div className="col-md-4 col-lg-4 offset-lg-1">
              <img
                src={
                  props.image === ""
                    ? ""
                    : props.image.Id === 0
                    ? "assets/img/bg/default.jpg"
                    : `https://sabio-training.s3.us-west-2.amazonaws.com/${
                        props.image.BasePath
                      }/${props.image.SystemFileName}`
                }
                alt=""
                style={{ width: "250px", height: "250px" }}
              />
            </div>
            <div className="col-md-8 col-lg-8">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control mb-1"
                  value={props.username}
                  disabled={true}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Goal</label>
                <Select
                  value={props.selectedOption}
                  onChange={props.onGoalChange}
                  options={options}
                  placeholder="Select..."
                  name="goalId"
                />
              </div>
              <div className="form-group">
                <br />
                <button
                  className="btn btn-success float-right"
                  onClick={props.updateGoal}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-toggle="modal"
                  data-target="#imageEditor"
                >
                  Edit Image
                </button>
              </div>
            </div>
          </div>
          <hr className="border-light m-0" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default InformationHtml;
