// eslint-disable-file jsx-a11y/control-has-associated-label
import React, { forwardRef } from 'react';

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
  return (
    <div className={`form-group ${className || ''}`}>
      <label htmlFor={name}>{label}</label>
      <select
        className="select"
        name={name}
        id={name}
        value={value}
        {...rest}
        ref={ref}
        aria-label={label}>
        {/* eslint-disable-next-line */}
        <option value="" disabled />
        {options &&
          options.length &&
          options.map((option) => (
            <option
              value={optionKeys ? option[optionKeys.value] : option}
              key={optionKeys ? option[optionKeys.value] : option}>
              {optionKeys ? option[optionKeys.name] : option}
            </option>
          ))}
      </select>
      {error && <p className="error-txt">{error}</p>}
    </div>
  );
});
export default Select;
