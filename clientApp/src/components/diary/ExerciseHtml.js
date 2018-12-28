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
              <tbody>
                <tr
                  className="header"
                  style={{ borderBottom: "4px solid", borderTop: "4px solid" }}
                >
                  <td />
                  <td>Exercise Name</td>
                  <td>Calories</td>
                  <td />
                </tr>
                {props.exerciseArr.length === 0 ? (
                  <tr>
                    <td>Exercise</td>
                  </tr>
                ) : (
                  props.exerciseArr.map((exercise, index) => {
                    if (index === 0) {
                      return (
                        <tr key={index}>
                          <td>Exercise</td>
                          <td>{exercise.ExerciseName}</td>
                          <td>{exercise.Calories}</td>
                          <td>
                            <span onClick={props.deleteExercise}>
                              <i
                                id={exercise.Id}
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
                          <td>{exercise.ExerciseName}</td>
                          <td>{exercise.Calories}</td>
                          <td>
                            <span onClick={props.deleteExercise}>
                              <i
                                id={exercise.Id}
                                className="ion ion-ios-close-circle-outline"
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  })
                )}
                <tr className="total" style={{ borderTop: "4px solid" }}>
                  <td className="first">Totals</td>
                  <td />
                  <td>{props.caloriesBurned}</td>
                  <td />
                </tr>
              </tbody>
            </table>
            <div className="row" style={{ margin: "12px" }}>
              <div className="col-md-7 col-lg-6 offset-md-1 offset-lg-2">
                <label className="form-label">Exercise Name</label>
                <input
                  type="text"
                  name="exerciseName"
                  className="form-control"
                  value={props.exerciseName}
                  onChange={props.onChange}
                />
              </div>
              <div className="col-md-3 col-lg-2">
                <label className="form-label">Calories</label>
                <div className="input-group">
                  <input
                    type="number"
                    name="calories"
                    className="form-control"
                    value={props.calories}
                    onChange={props.onChange}
                  />
                  <span className="input-group-append">
                    <button
                      className="btn btn-success"
                      onClick={props.addExercise}
                    >
                      Add
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="row" style={{ margin: "12px" }}>
              <div className="col-md-7 col-lg-6 offset-md-1 offset-lg-2">
                <font style={{ fontSize: "12pt", color: "maroon" }}>
                  Click<span> </span>
                  <a
                    href="https://bit.ly/2E212qV"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>{" "}
                  to calculate the calories burned from a specific exercise.
                </font>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseHtml;
