import React from 'react';

function TextArea({ name, label, className, error, ...args }) {
  return (
    <div className={`form-group ${className || ''}`}>
      <label htmlFor={name}>{label}</label>
      <textarea className="textarea" name={name} id={name} {...args} />
      {error && <p className="error-txt">{error}</p>}
    </div>
  );
}

export default TextArea;
