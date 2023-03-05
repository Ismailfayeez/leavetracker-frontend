import React from "react";
import { Link } from "react-router-dom";

function GroupCard({ group }) {
  return (
    <div className="group-card">
      <div className="group-card__block-1">
        <div className="group-card__title">
          <Link className="link" to={`${group.id}`}>
            {group.name}
          </Link>
        </div>
        <div className="group-card__description">{group.description}</div>
      </div>
      <div className="group-card__block-2">
        <div className="group-card__members">{group.member_count} members</div>
      </div>
      {group.enable_subscription && group.subscribed && (
        <button style={{ backgroundColor: "grey", color: "white" }}>
          subscribed
        </button>
      )}
      {group.enable_subscription && !group.subscribed && (
        <button style={{ backgroundColor: "red", color: "white" }}>
          subscribe
        </button>
      )}
    </div>
  );
}

export default GroupCard;
