import React, { useRef } from "react";
import "./listItemCard.scss";

function ListItemCard({
  enableCheckbox,
  id,
  title,
  subTitle,
  checked,
  disableCheckBoxInput,
  handleChecked,
}) {
  const inputRef = useRef(null);

  return (
    <div className="list-item card">
      <div className="card__body flex">
        {enableCheckbox && (
          <div className="flex flex--center">
            <input
              type="checkbox"
              className="check-box"
              ref={inputRef}
              disabled={disableCheckBoxInput}
              checked={checked}
              id={id}
              onClick={(e) => handleChecked(e, id)}
            />
          </div>
        )}
        <div className="flex-item-grow overflow--auto">
          <div
            className="list-item__title bold text-overflow--ellipsis"
            onClick={() => inputRef.current.click()}
          >
            {title}
          </div>
          <div className="list-item__sub-title sub-text text-overflow--ellipsis">
            {subTitle}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItemCard;
