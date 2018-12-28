import React from "react";
import { Link } from "react-router-dom";
import TextInput from "../../common/TextInput";

const RegisterHtml = props => {
  return (
    <React.Fragment>
      <div className="authentication-wrapper authentication-3 page">
        <div className="d-flex authentication-inner">
          {/* <!-- Do not display the container on extra small, small and medium screens --> */}
          <div
            className="background d-none d-lg-flex col-lg-8 align-items-center ui-bg-cover ui-bg-overlay-container p-5"
            style={{
              backgroundImage: "url(assets/img/bg/community.jpg)",
              height: "100vh"
            }}
          >
            <div className="ui-bg-overlay bg-dark opacity-50" />
            {/* <!-- Text --> */}
            <div className="w-100 text-white px-5">
              <h1 className="display-2 font-weight-bolder mb-4">
                JOIN OUR
                <br />
                COMMUNITY
              </h1>
              <div className="text-large font-weight-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum vehicula ex eu gravida faucibus. Suspendisse viverra
                pharetra purus. Proin fringilla ac lorem at sagittis. Proin
                tincidunt dui et nunc ultricies dignissim.
              </div>
            </div>
            {/* <!-- /.Text --> */}
          </div>
          {/* <!-- Form container --> */}
          <div className="d-flex col-lg-4 align-items-center bg-white p-5">
            {/* <!-- Inner container --> */}
            {/* <!-- Have to add `.d-flex` to control width via `.col-*` classNamees --> */}
            <div className="d-flex col-sm-7 col-md-5 col-lg-12 px-0 px-xl-4 mx-auto">
              <div className="w-100">
                {/* <!-- Logo --> */}
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src="assets/img/logo/runningMan.png"
                    alt=""
                    style={{ height: "120px" }}
                  />
                </div>
                {/* <!-- / Logo --> */}
                <h4 className="text-center text-lighter font-weight-normal mt-5 mb-0">
                  Create an Account
                </h4>
                {/* <!-- Form --> */}
                <form className="my-5">
                  <TextInput
                    name="name"
                    type="text"
                    label="Your Name"
                    value={props.name}
                    onChange={props.onChange}
                    isValid={props.nameValid || !props.showErrors}
                    hintText="Please enter your name"
                  />
                  <TextInput
                    name="email"
                    type="email"
                    label="Your Email"
                    value={props.email}
                    onChange={props.onChange}
                    isValid={props.emailValid || !props.showErrors}
                    hintText="Please enter a valid email"
                  />
                  <TextInput
                    name="password"
                    type="password"
                    label="Password"
                    value={props.password}
                    onChange={props.onChange}
                    isValid={props.passwordValid || !props.showErrors}
                    hintText="Password must be a minimum of 6 characters with at least one uppercase letter, one lowercase letter, one number, and one special character"
                  />
                  <TextInput
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={props.confirmPassword}
                    onChange={props.onChange}
                    isValid={props.confirmPasswordValid || !props.showErrors}
                    hintText="Passwords must be identical"
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-block mt-4"
                    onClick={props.onClick}
                  >
                    Sign Up
                  </button>
                </form>
                {/* <!-- / Form --> */}
                <div className="text-center text-muted">
                  Already have an account?
                  <span> </span>
                  <Link to="/login">Sign In</Link>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- / Form container --> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterHtml;
