import React from "react";
import LoginHtml from "./LoginHtml";
import UserService from "../../services/UserService";

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
        passwordValid = value.match(
          /^(?=(.*[A-Z]){1,})(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/
        );
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Password must be a minimum of 6 characters with at least one uppercase letter, one lowercase letter, one number, and one special character";
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
      UserService.login(this.state.email, this.state.password)
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
      // console.log("Please put an axios call here");
      // this.setState({ showErrors: false }, () => this.props.loginSuccess());
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
