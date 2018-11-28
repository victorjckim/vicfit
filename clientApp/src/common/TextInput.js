import React from "react";

const TextInput = props => {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        className={`form-control ${props.isValid ? "" : "is-invalid"}`}
        name={props.name}
        type={props.type}
        value={props.value}
        checked={props.checked}
        placeholder={props.placeholder}
        disabled={props.disabled}
        onChange={props.onChange}
      />
      <div className="invalid-feedback">{props.hintText}</div>
    </div>
  );
};

export default TextInput;
