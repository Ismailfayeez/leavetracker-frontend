import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  renderButton,
  renderInput,
  renderSelect,
  renderTextArea,
} from "../../../../../utilities/uiElements";
import "./announcementForm.scss";

function AnnouncementForm({
  data,
  errors,
  handleChange,
  handleBlur,
  handleDisplaySearchGroups,
  handleRemoveTeam,
  handleSubmit,
}) {
  console.log(data, errors);

  return (
    <form
      className="add-announcement form flex flex--column full-height gap--10px"
      onSubmit={handleSubmit}
    >
      <div className="flex-item-grow overflow--auto flex flex--column gap--10px">
        {renderInput({
          name: "title",
          label: "Title",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
        })}
        {renderTextArea({
          name: "message",
          label: "Message",
          data,
          handleChange,
          row: "5",
          col: "10",
          onBlur: handleBlur,
          errors,
        })}
        {renderInput({
          name: "expiryDate",
          label: "Expiry Date",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
          type: "date",
        })}
        {renderSelect({
          name: "priority",
          label: "Priority",
          data,
          handleChange,
          onBlur: handleBlur,
          errors,
          options: [
            { name: "Low", value: "L" },
            { name: "Medium", value: "M" },
            { name: "High", value: "H" },
          ],
          optionKeys: { name: "name", value: "value" },
        })}
        <div className="add-announcement__teams">
          <label>
            <span className="bold"> Groups</span>{" "}
            <span
              className="sub-text"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={handleDisplaySearchGroups}
            >
              add
            </span>
          </label>
          {data.teams.length > 0 && (
            <div className="flex flex-wrap team-list-container gap--10px">
              {data.teams.map((team) => (
                <span className="badge badge badge--black-outline sub-text">
                  {team.name}
                  <FontAwesomeIcon
                    icon={faRemove}
                    onClick={() => handleRemoveTeam(team.id)}
                    style={{
                      paddingLeft: "0.3rem",
                    }}
                  />{" "}
                </span>
              ))}
            </div>
          )}
          {errors["teams"] && <p className="error-txt">{errors["teams"]}</p>}
        </div>
      </div>
      <div className="btn-container-grow">
        {renderButton({
          type: "submit",
          content: "Add",
          className: "btn--md btn--matte-black",
        })}
      </div>
    </form>
  );
}

export default AnnouncementForm;
