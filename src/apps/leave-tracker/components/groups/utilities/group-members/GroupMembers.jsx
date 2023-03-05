import React from "react";
import GroupMemberCard from "../../../../../../ui-kit/cards/group-member-card/GroupMemberCard";
import "./groupMembers.scss";
function GroupMembers(props) {
  const {
    title,
    groupMembers,
    handleMakeAsAdmin,
    handleRemoveMember,
    handleDismissAsAdmin,
  } = props;
  console.log(groupMembers);
  if (groupMembers.length <= 0) return null;
  return (
    <div className={`group-members`}>
      <div className="group-members__title">{title}</div>
      <ul className="group-member__list grid grid--1x2 grid--tablet grid-gap-10px grid-items-center">
        {groupMembers.map(
          ({
            id,
            username: name,
            email,
            role,
            allow_make_as_admin,
            allow_remove,
            allow_dismiss_as_admin,
          }) => (
            <GroupMemberCard
              className=""
              data={{ name, email, role }}
              makeAsAdmin={allow_make_as_admin}
              removeMember={allow_remove}
              dismissAsAdmin={allow_dismiss_as_admin}
              handleMakeAsAdmin={() => handleMakeAsAdmin(id)}
              handleRemoveMember={() => handleRemoveMember(id)}
              handleDismissAsAdmin={() => handleDismissAsAdmin(id)}
            />
          )
        )}
      </ul>
    </div>
  );
}

export default GroupMembers;
