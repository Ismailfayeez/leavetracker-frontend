import React from 'react';
import './checkBox.scss';

function CheckBox({ label, handleChange, value, id, checked }) {
  return (
    <div className="checkbox">
      <input type="checkbox" onChange={handleChange} id={id} checked={checked} value={value} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default CheckBox;
