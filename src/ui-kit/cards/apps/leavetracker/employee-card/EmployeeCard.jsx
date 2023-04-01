import React, { useRef } from 'react';
import './employeeCard.scss';

function EmployeeCard({ employee, enableCheckBox, checked, handleChecked, disableCheckBoxInput }) {
  const inputRef = useRef(null);
  return (
    <div className="employee card">
      <div className="card__body flex">
        {enableCheckBox && (
          <div className="flex flex--center">
            <input
              type="checkbox"
              className="check-box"
              ref={inputRef}
              disabled={disableCheckBoxInput}
              checked={checked}
              id={employee.id}
              onClick={(e) => handleChecked(e, { ...employee })}
            />
          </div>
        )}

        <div className="flex-item-grow overflow--auto">
          <div
            className="employee__name bold text-overflow--ellipsis"
            onClick={() => inputRef.current.click()}
            role="presentation">
            {employee.name}
          </div>
          <div className="employee__email sub-text text-overflow--ellipsis">{employee.email}</div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
