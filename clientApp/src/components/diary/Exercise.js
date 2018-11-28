import React from "react";
import ExerciseHtml from "./ExerciseHtml";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <ExerciseHtml />
      </React.Fragment>
    );
  }
}

export default Exercise;
