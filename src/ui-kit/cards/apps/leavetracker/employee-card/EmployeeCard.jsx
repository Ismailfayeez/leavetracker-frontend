import React from "react";
import TextIcon from "../../../../text-icon/TextIcon";
import "./employeeCard.scss";
function EmployeeCard({
  employee,
  enableCheckBox,
  checked,
  handleChecked,
  disableCheckBoxInput,
}) {
  return (
    <div className="employee card">
      <div className="card__body flex">
        {enableCheckBox && (
          <div className="flex flex--center">
            <input
              type="checkbox"
              className="check-box"
              disabled={disableCheckBoxInput}
              checked={checked}
              onClick={(e) => handleChecked(e, { ...employee })}
            />
          </div>
        )}

        <div className="flex-grow overflow-auto">
          <div className="employee__name bold text-overflow-ellipsis">
            {employee.name}
          </div>
          <div className="employee__email sub-text text-overflow-ellipsis">
            {employee.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCard;
