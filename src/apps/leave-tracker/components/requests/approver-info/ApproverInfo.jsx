import React from 'react';
import ApproverCard from '../../../../../ui-kit/cards/approver-card/ApproverCard';
import './approverInfo.scss';

function ApproverInfo({ approvers }) {
  return (
    <div className="approver-info">
      {approvers.length < 1 ? (
        <p style={{ textAlign: 'center' }}>Approvers not found</p>
      ) : (
        <>
          <header className="approver-info__header">
            <h4 style={{ margin: 0, fontSize: '2rem' }}>Approvers</h4>
          </header>
          <div className="approver-info__body">
            {approvers.map((approver) => (
              <ApproverCard
                key={approver.email}
                name={approver.username}
                email={approver.email}
                className="approver-card--theme-bluish-white"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ApproverInfo;
