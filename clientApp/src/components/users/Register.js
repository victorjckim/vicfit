import React from "react";
import RegisterHtml from "./RegisterHtml";
import "./Users.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      formErrors: {
        name: "",
        email: "",
        password: ""
      },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      showErrors: false
    };
  }

  onChange = evt => {
    const key = evt.target.name;
    const val = evt.target.value;
    console.log(key, val);
    this.setState({ [key]: val }, () => this.validateField(key, val));
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length > 1;
        fieldValidationErrors.name = nameValid ? "" : "Please enter your name";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ""
          : "Please enter a valid email address";
        break;
      case "password":
        passwordValid = value.length > 5;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Password must be a minimum of 6 characters";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.passwordValid
    });
  }

  onClick = () => {
    if (this.state.formValid) {
      console.log("Please put an axios call here");
      this.setState({ showErrors: false });
    } else {
      this.setState({ showErrors: true });
    }
  };

  render() {
    return (
      <RegisterHtml
        {...this.state}
        onClick={this.onClick}
        onChange={this.onChange}
      />
    );
  }
}

export default Register;
