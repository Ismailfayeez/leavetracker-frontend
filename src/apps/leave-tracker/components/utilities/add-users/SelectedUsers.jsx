import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set } from "lodash";
import React, { useState } from "react";
import EmployeeCard from "../../../../../ui-kit/cards/apps/leavetracker/employee-card/EmployeeCard";
import { renderButton } from "../../../../../utilities/uiElements";
function SelectedUsers({
  selectedUsers,
  setDisplaySelectedPage,
  handleSubmit,
}) {
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  return (
    <section className="selected-users flex flex--column full-height">
      <div style={{ paddingBottom: "0.5rem" }}>
        <span>Selected {selectedUsers.length}</span>
        <span style={{ paddingLeft: "1rem" }}>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setDisplaySelectedPage(false)}
          />
        </span>
      </div>
      <div className="flex flex--column gap--1rem flex-grow overflow-auto">
        {selectedUsers.map(({ name, email }) => (
          <EmployeeCard
            employee={{ name, email }}
            className="employee-card--theme-bluish-white"
          />
        ))}
      </div>
      <div className="flex flex--center flex-wrap btn-container btn-items-grow">
        {renderButton({
          content: "Submit",
          className: "btn--md btn--matte-black",
          loading: isLoading,
          onClick: async () => {
            setIsLoading(true);
            await handleSubmit();
            setIsLoading(false);
          },
        })}
      </div>
    </section>
  );
}

export default SelectedUsers;
