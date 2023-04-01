import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { renderButton } from '../../../../../utilities/uiElements';
import Popover from '../../../../popover/Popover';
import './groupMemberCard.scss';

function GroupMemberCard({
  data,
  className,
  removeMember,
  handleRemoveMember,
  makeAsAdmin,
  handleMakeAsAdmin,
  dismissAsAdmin,
  handleDismissAsAdmin
}) {
  const { name, email } = data;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`group-member card ${className || 'groupmember--white'}`}>
      <div className="card__body flex flex--center">
        <div className="flex-item-grow overflow--auto">
          <div className="group-member__name text-overflow--ellipsis">{name}</div>
          <div className="groupMember__email text-overflow--ellipsis sub-text">{email}</div>
        </div>
        {(makeAsAdmin || removeMember || dismissAsAdmin) && (
          <div>
            <Popover
              targetElement={<FontAwesomeIcon icon={faEllipsisH} className="cursor-pointer" />}
              isOpen={isOpen}
              setIsOpen={setIsOpen}>
              <ul className="group-member__action">
                {makeAsAdmin && (
                  <li className="group-member__action-item">
                    {renderButton({
                      content: 'make as admin',
                      className: 'btn--block btn--transparent',
                      onClick: () => {
                        setIsOpen(false);
                        handleMakeAsAdmin(data);
                      }
                    })}
                  </li>
                )}
                {removeMember && (
                  <li className="group-member__action-item">
                    {renderButton({
                      content: `remove`,
                      className: 'btn--block btn--transparent',
                      onClick: () => {
                        setIsOpen(false);
                        handleRemoveMember(data);
                      }
                    })}
                  </li>
                )}
                {dismissAsAdmin && (
                  <li className="group-member__action-item">
                    {renderButton({
                      content: 'dismiss as admin',
                      className: 'btn--block btn--transparent',
                      onClick: () => {
                        setIsOpen(false);
                        handleDismissAsAdmin(data);
                      }
                    })}
                  </li>
                )}
              </ul>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupMemberCard;
