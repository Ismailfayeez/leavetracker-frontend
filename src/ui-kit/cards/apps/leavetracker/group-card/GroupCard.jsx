import React from "react";
import "./groupCard.scss";
import { renderButton } from "../../../../../utilities/uiElements";
import TextIcon from "../../../../text-icon/TextIcon";
function GroupCard({
  className,
  group,
  handleGroupName,
  handleSubscribe,
  handleUnSubscribe,
}) {
  const { name, description, member_count, enable_subscription, subscribed } =
    group;
  return (
    <div className={`group card ${className || ""}`}>
      <div className="card__body">
        <div
          className="flex flex--space-between"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="card__item group__name bold text-overflow-ellipsis cursor-pointer"
            onClick={handleGroupName}
          >
            {name}
          </div>
          <div className="card__item group__member-count">
            <div className="flex flex--center" style={{ whiteSpace: "nowrap" }}>
              {member_count} members
            </div>
          </div>{" "}
        </div>
        <div className="card__item group__description text-overflow-ellipsis">
          {description}
        </div>

        <div className=" group__subscribed flex--end">
          {enable_subscription &&
            subscribed &&
            renderButton({
              content: "subscribed",
              onClick: handleUnSubscribe,
              className: "btn--dark-grey btn--sm",
            })}
          {enable_subscription &&
            !subscribed &&
            renderButton({
              content: "subscribe",
              onClick: handleSubscribe,
              className: "btn--red btn--sm",
            })}
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
