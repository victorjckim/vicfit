import React from "react";
import LoginHtml from "./LoginHtml";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: {
        email: "",
        password: ""
      },
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
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
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

  onClick = () => {
    if (this.state.formValid) {
      console.log("Please put an axios call here");
      this.setState({ showErrors: false }, () => this.props.loginSuccess());
    } else {
      this.setState({ showErrors: true });
    }
  };

  render() {
    return (
      <LoginHtml
        {...this.state}
        onChange={this.onChange}
        onClick={this.onClick}
      />
    );
  }
}

export default Login;
