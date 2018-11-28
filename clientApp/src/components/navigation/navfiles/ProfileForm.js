import React from "react";
import RawInput from "../../../common/RawInput";
import Select from "react-select";
import "./Profile.css";

const ProfileForm = props => {
  const options = [
    { value: "", label: "Select..." },
    { value: "lose", label: "Lose weight" },
    { value: "gain", label: "Gain muscle" },
    { value: "loseGain", label: "I'm a beginner, so give me both!" }
  ];
  const feet = [
    { name: "feet", value: "", label: "Select..." },
    { name: "feet", value: 4, label: "4" },
    { name: "feet", value: 5, label: "5" },
    { name: "feet", value: 6, label: "6" },
    { name: "feet", value: 7, label: "7" }
  ];
  const inches = [
    { name: "inches", value: "", label: "Select..." },
    { name: "inches", value: 0, label: "0" },
    { name: "inches", value: 1, label: "1" },
    { name: "inches", value: 2, label: "2" },
    { name: "inches", value: 3, label: "3" },
    { name: "inches", value: 4, label: "4" },
    { name: "inches", value: 5, label: "5" },
    { name: "inches", value: 6, label: "6" },
    { name: "inches", value: 7, label: "7" },
    { name: "inches", value: 8, label: "8" },
    { name: "inches", value: 9, label: "9" },
    { name: "inches", value: 10, label: "10" },
    { name: "inches", value: 11, label: "11" }
  ];
  return (
    <div
      className="col-md-10 offset-md-1
    "
    >
      <form className="my-3">
        <div className="row">
          <div className="form-group col-md-3">
            <label className="form-label">Height</label>
            <Select
              onChange={props.onHeightChange}
              options={feet}
              placeholder="Select..."
              name="feet"
            />
          </div>
          <div className="form-group col-md-3">
            <label className="form-label">Inches</label>
            <Select
              onChange={props.onHeightChange}
              options={inches}
              placeholder="Select..."
              name="inches"
            />
          </div>
        </div>
        <div className="row">
          <RawInput
            sizing="col-md-3"
            name="currentWeight"
            type="number"
            label="Current Weight"
            onChange={props.onChange}
            value={props.currentWeight}
            isValid={props.currentWeightValid || !props.showErrors}
            hintText="Required"
          />
          <RawInput
            sizing="col-md-3"
            name="goalWeight"
            type="number"
            label="Goal Weight"
            onChange={props.onChange}
            value={props.goalWeight}
            isValid={props.goalWeightValid || !props.showErrors}
            hintText="Required"
          />
        </div>
        <div className="row">
          <RawInput
            sizing="col-md-6"
            name="age"
            type="number"
            label="Age"
            max="100"
            onChange={props.onChange}
            value={props.age}
            isValid={props.ageValid || !props.showErrors}
            hintText="Must be 13 years or older"
          />
        </div>
        <div className="row">
          <div className="form-group col-md-6 mt-1">
            <label className="form-label">Gender</label>
            <div className="radioContainer">
              <label className="radio-inline mr-3">
                <input
                  type="radio"
                  name="gender"
                  className="mr-1"
                  value="male"
                  onChange={props.onChange}
                />
                Male
              </label>
              <label className="radio-inline mr-3">
                <input
                  type="radio"
                  name="gender"
                  className="mr-1"
                  value="female"
                  onChange={props.onChange}
                />
                Female
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="gender"
                  className="mr-1"
                  value="other"
                  onChange={props.onChange}
                />
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Goal</label>
          <Select
            value={props.goals}
            onChange={props.onGoalChange}
            options={options}
            placeholder="Select..."
            name="goal"
          />
        </div>
        <div className="form-group mt-1">
          {" "}
          <label className="form-label">
            How would you describe your normal daily activities?
          </label>
          <div className="radioContainer">
            <div className="radio mr-3">
              <input
                type="radio"
                name="active"
                className="mr-1"
                value="1.2"
                onChange={props.onChange}
              />
              Sedentary: Spend most of the day sitting (e.g. bank teller, desk
              job)
            </div>
            <div className="radio mr-3">
              <input
                type="radio"
                name="active"
                className="mr-1"
                value="1.375"
                onChange={props.onChange}
              />
              Lightly Active: Spend a good part of the day on your feet (e.g.
              teacher, salesperson)
            </div>
            <div className="radio">
              <input
                type="radio"
                name="active"
                className="mr-1"
                value="1.55"
                onChange={props.onChange}
              />
              Active: Spend a good part of the day doing some physical activity
              (e.g. food server, postal carrier)
            </div>
            <div className="radio">
              <input
                type="radio"
                name="active"
                className="mr-1"
                value="1.725"
                onChange={props.onChange}
              />
              Very Active: Spend most of the day doing heavy physical activity
              (e.g. bike messenger, carpenter)
            </div>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary mb-3 float-right"
          onClick={props.submitProfile}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
