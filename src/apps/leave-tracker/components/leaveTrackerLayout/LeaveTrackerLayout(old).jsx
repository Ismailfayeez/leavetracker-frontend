import React from 'react';
import LeaveTracker from '../../../../Routes/LeaveTracker(old)';
import "./leaveTrackerLayout.scss"

function LeaveTrackerLayout(props) {
    return (
        <div className='leaveTrackerLayout leaveTrackerLayout--white-bg'>
            <div className='leaveTrackerContent'>
            <LeaveTracker/>
            </div>
        </div>
    );
}

export default LeaveTrackerLayout;