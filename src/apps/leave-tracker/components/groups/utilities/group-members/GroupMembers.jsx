import React from 'react';
import GroupMemberCard from '../../../../../../ui-kit/cards/apps/leavetracker/group-member-card/GroupMemberCard';
import './groupMembers.scss';

function GroupMembers(props) {
  const { title, groupMembers, handleMakeAsAdmin, handleRemoveMember, handleDismissAsAdmin } =
    props;
  if (groupMembers.length <= 0) return null;
  return (
    <div className="group-members">
      <div className="group-members__title">{title}</div>
      <ul className="group-member__list grid grid--1x2 grid--tablet gap--10px grid--center">
        {groupMembers.map(
          ({
            id,
            username: name,
            email,
            role,
            allow_make_as_admin: allowMakeAsAdmin,
            allow_remove: allowRemove,
            allow_dismiss_as_admin: allowDismissAsAdmin
          }) => (
            <GroupMemberCard
              key={id}
              className=""
              data={{ name, email, role }}
              makeAsAdmin={allowMakeAsAdmin}
              removeMember={allowRemove}
              dismissAsAdmin={allowDismissAsAdmin}
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
