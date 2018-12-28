import React from "react";
import ExerciseHtml from "./ExerciseHtml";
import ExerciseService from "../../services/ExerciseService";
import moment from "moment";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseArr: [],
      calories: "",
      exerciseName: "",
      caloriesBurned: ""
    };
  }

  async componentDidMount() {
    const exerciseList = await ExerciseService.selectByUserId(
      sessionStorage.getItem("userId"),
      moment().format("YYYY-MM-DD")
    );
    const exerciseTotal = await ExerciseService.selectTotalByUserId(
      sessionStorage.getItem("userId")
    );
    this.setState({
      exerciseArr: exerciseList.data.Items,
      caloriesBurned: exerciseTotal.data.Item.CaloriesBurned
    });
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val });
  };

  addExercise = async () => {
    const { calories, exerciseName } = this.state;
    const dataObj = {
      exerciseName: exerciseName,
      calories: calories,
      date: moment().format("YYYY-MM-DD"),
      userId: sessionStorage.getItem("userId")
    };
    const exerciseReq = await ExerciseService.create(dataObj);
    const exerciseList = await ExerciseService.selectByUserId(
      sessionStorage.getItem("userId"),
      moment().format("YYYY-MM-DD")
    );
    const exerciseTotal = await ExerciseService.selectTotalByUserId(
      sessionStorage.getItem("userId")
    );
    console.log(exerciseReq, exerciseList);
    this.setState({
      exerciseArr: exerciseList.data.Items,
      caloriesBurned: exerciseTotal.data.Item.CaloriesBurned,
      calories: "",
      exerciseName: ""
    });
  };

  deleteExercise = async evt => {
    const deleteExercise = await ExerciseService.delete(evt.target.id);
    const exerciseList = await ExerciseService.selectByUserId(
      sessionStorage.getItem("userId"),
      moment().format("YYYY-MM-DD")
    );
    const exerciseTotal = await ExerciseService.selectTotalByUserId(
      sessionStorage.getItem("userId")
    );
    console.log(deleteExercise);
    this.setState({
      exerciseArr: exerciseList.data.Items,
      caloriesBurned: exerciseTotal.data.Item.CaloriesBurned
    });
  };

  render() {
    return (
      <React.Fragment>
        <ExerciseHtml
          {...this.state}
          onChange={this.onChange}
          addExercise={this.addExercise}
          deleteExercise={this.deleteExercise}
        />
      </React.Fragment>
    );
  }
}

export default Exercise;
