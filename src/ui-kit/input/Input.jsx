import React from "react";
import "../../styles/scss/variable.scss";
const Input = ({ name, label, className, error, ...args }) => (
  <div className={`form-group ${className ? className : ""}`}>
    <label htmlFor={name}>{label}</label>
    <input className="input" name={name} id={name} {...args} />
    {error && <p className="error-txt">{error}</p>}
  </div>
);

export default Input;
