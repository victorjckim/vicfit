import React from "react";
import ProfileForm from "./ProfileForm";
import ProfileService from "../../../services/ProfileService";
import MacrosService from "../../../services/MacrosService";
import { connect } from "react-redux";
import { getId } from "../../redux/UserActions";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      feet: "",
      inches: "",
      selectedOption: "",
      gender: "",
      active: "",
      currentWeight: "",
      goalWeight: "",
      age: "",
      formErrors: {
        goal: "",
        feet: "",
        inches: "",
        gender: "",
        active: "",
        currentWeight: "",
        goalWeight: "",
        age: ""
      },
      goalValid: false,
      feetValid: false,
      inchesValid: false,
      genderValid: false,
      activeValid: false,
      currentWeightValid: false,
      goalWeightValid: false,
      ageValid: false
    };
  }

  componentDidMount() {
    this.props.getUserId(this.props.user.userName);
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    this.setState({ [key]: val }, () => this.validateField(key, val));
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let goalValid = this.state.goalValid;
    let feetValid = this.state.feetValid;
    let inchesValid = this.state.inchesValid;
    let genderValid = this.state.genderValid;
    let activeValid = this.state.activeValid;
    let currentWeightValid = this.state.currentWeightValid;
    let goalWeightValid = this.state.goalWeightValid;
    let ageValid = this.state.ageValid;

    switch (fieldName) {
      case "goal":
        goalValid = value > 0;
        fieldValidationErrors.goal = goalValid ? "" : "Please select a goal";
        break;
      case "feet":
        feetValid = parseInt(value) >= 4;
        fieldValidationErrors.feet = feetValid
          ? ""
          : "Please select the feet of your height";
        break;
      case "inches":
        inchesValid = parseInt(value) >= 0;
        fieldValidationErrors.inches = inchesValid
          ? ""
          : "Please select the inches of your height";
        break;
      case "gender":
        genderValid = !value.match(/""/g);
        fieldValidationErrors.gender = genderValid
          ? ""
          : "Please select a gender option";
        break;
      case "active":
        activeValid = !value.match(/""/g);
        fieldValidationErrors.active = activeValid
          ? ""
          : "Please select your activity level";
        break;
      case "currentWeight":
        currentWeightValid = parseInt(value) > 80;
        fieldValidationErrors.currentWeight = currentWeightValid
          ? ""
          : "Please enter your current weight";
        break;
      case "goalWeight":
        goalWeightValid = parseInt(value) > 80;
        fieldValidationErrors.goalWeight = goalWeightValid
          ? ""
          : "Please enter your goal weight";
        break;
      case "age":
        ageValid = parseInt(value) > 12;
        fieldValidationErrors.age = ageValid
          ? ""
          : "Must be 13 years or older to use this service";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        goalValid: goalValid,
        feetValid: feetValid,
        inchesValid: inchesValid,
        genderValid: genderValid,
        activeValid: activeValid,
        currentWeightValid: currentWeightValid,
        goalWeightValid: goalWeightValid,
        ageValid: ageValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.goalValid &&
        this.state.feetValid &&
        this.state.inchesValid &&
        this.state.genderValid &&
        this.state.activeValid &&
        this.state.currentWeightValid &&
        this.state.goalWeightValid &&
        this.state.ageValid
    });
  }

  onGoalChange = evt => {
    console.log(evt);
    this.setState({ goal: evt.value, selectedOption: evt }, () =>
      this.validateField("goal", evt.value)
    );
  };

  onHeightChange = evt => {
    if (evt.name === "feet") {
      this.setState({ feet: evt.value }, () =>
        this.validateField("feet", evt.value)
      );
    } else {
      this.setState({ inches: evt.value }, () =>
        this.validateField("inches", evt.value)
      );
    }
  };

  submitProfile = async () => {
    const {
      feet,
      inches,
      currentWeight,
      goalWeight,
      age,
      gender,
      goal,
      active
    } = this.state;
    if (this.state.formValid) {
      const height = feet * 12 + inches;
      const profileData = {
        height: height,
        currentWeight: parseInt(currentWeight),
        goalWeight: parseInt(goalWeight),
        age: parseInt(age),
        gender: gender,
        goalId: goal,
        activity: parseFloat(active),
        userId: this.props.user.userId
      };
      await ProfileService.create(profileData)
        .then(
          async resp =>
            await MacrosService.create(this.props.user.userId, resp.data.Item)
        )
        .catch(err => console.error(err));
      this.setState({ showErrors: false }, () =>
        this.props.history.push("/dashboard")
      );
    } else {
      this.setState({ showErrors: true }, () =>
        console.log("Something went wrong")
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="col-lg-6 offset-lg-3">
          <div
            className="card"
            style={{ backgroundColor: "whitesmoke", opacity: "0.95" }}
          >
            <h4 className="text-center font-weight-normal mt-4">
              Tell us about yourself.
            </h4>
            <small className="text-center font-weight-normal">
              We will use this information to create a personalized diet and
              exercise profile for you.
            </small>
            <ProfileForm
              {...this.state}
              onChange={this.onChange}
              submitProfile={this.submitProfile}
              onGoalChange={this.onGoalChange}
              onHeightChange={this.onHeightChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserId: email => {
      dispatch(getId(email))
        .then(resp => {
          console.log(resp);
        })
        .catch(err => console.error(err));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
