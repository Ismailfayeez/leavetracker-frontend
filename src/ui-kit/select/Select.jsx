import React, { useId, useState } from "react";
import { forwardRef } from "react";

const Select = forwardRef(function Select(
  {
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
  },
  ref
) {
  const id = useId();
  return (
    <div className={`form-group ${className ? className : ""}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        className="select"
        name={name}
        id={name}
        value={value}
        {...rest}
        ref={ref}
      >
        <option value="" disabled></option>
        {options &&
          options.length &&
          options.map((option) => (
            <option
              value={optionKeys ? option[optionKeys["value"]] : option}
              key={optionKeys ? option[optionKeys["value"]] : option + id}
            >
              {optionKeys ? option[optionKeys["name"]] : option}
            </option>
          ))}
      </select>
      {error && <p className="error-txt">{error}</p>}
    </div>
  );
});
export default Select;
