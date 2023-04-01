import React from 'react';
import './groupCard.scss';
import { renderButton } from '../../../../../utilities/uiElements';

function GroupCard({ className, group, handleGroupName, handleSubscribe, handleUnSubscribe }) {
  const {
    name,
    description,
    member_count: memberCount,
    enable_subscription: enableSubscription,
    subscribed
  } = group;
  return (
    <div className={`group card ${className || ''}`}>
      <div className="card__body">
        <div
          className="flex flex-justify--space-between"
          style={{ justifyContent: 'space-between' }}>
          <div
            className="card__item group__name bold overflow--hidden text-overflow--ellipsis cursor-pointer"
            onClick={handleGroupName}
            role="presentation">
            {name}
          </div>
          <div className="card__item group__member-count">
            <div className="flex flex--center" style={{ whiteSpace: 'nowrap' }}>
              {memberCount} members
            </div>
          </div>{' '}
        </div>
        <div className="card__item group__description text-overflow--ellipsis">{description}</div>

        <div className=" group__subscribed flex--end">
          {enableSubscription &&
            subscribed &&
            renderButton({
              content: 'subscribed',
              onClick: handleUnSubscribe,
              className: 'btn--dark-grey btn--sm'
            })}
          {enableSubscription &&
            !subscribed &&
            renderButton({
              content: 'subscribe',
              onClick: handleSubscribe,
              className: 'btn--red btn--sm'
            })}
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
