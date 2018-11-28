import React from "react";
import RegisterHtml from "./RegisterHtml";
import UserService from "../../services/UserService";
import "./Users.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      formErrors: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
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
    let confirmPasswordValid = this.state.confirmPasswordValid;

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
        passwordValid = value.match(
          /^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/
        );
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Password must be a minimum of 6 characters with at least one uppercase letter, one lowercase letter, one number, and one special character";
        break;
      case "confirmPassword":
        confirmPasswordValid = value.match(this.state.password);
        fieldValidationErrors.confirmPassword = confirmPasswordValid
          ? ""
          : "Passwords must be identical";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
        confirmPasswordValid: confirmPasswordValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.confirmPasswordValid
    });
  }

  onClick = () => {
    if (this.state.formValid) {
      this.setState({ showErrors: false });
      UserService.register(this.state)
        .then(resp => {
          console.log(resp);
          this.props.history.push("/login");
        })
        .catch(err => console.error(err));
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
