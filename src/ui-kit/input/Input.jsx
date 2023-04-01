import React, { forwardRef } from 'react';
import '../../styles/scss/variable.scss';

const Input = forwardRef(function Input({ name, label, className, error, ...args }, ref) {
  return (
    <div className={`form-group ${className || ''}`}>
      <label htmlFor={name}>{label}</label>
      <input className="input" name={name} id={name} {...args} ref={ref} />
      {error && <p className="error-txt">{error}</p>}
    </div>
  );
});

export default Input;
