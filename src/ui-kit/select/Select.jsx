import React, { useState } from "react";

function Select({
  name,
  label,
  options,
  value,
  className,
  optionKeys,
  optionNameKey,
  optionValueKey,
  error,
  ...rest
}) {
  return (
    <div className={`form-group ${className ? className : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select className="select" name={name} id={name} value={value} {...rest}>
        <option value="" disabled></option>
        {options &&
          options.length &&
          options.map((option) => (
            <option value={optionKeys ? option[optionKeys["value"]] : option}>
              {optionKeys ? option[optionKeys["name"]] : option}
            </option>
          ))}
      </select>
      {error && <p className="error-txt">{error}</p>}
    </div>
  );
}

export default Select;
