import React from 'react';
import moment from 'moment';

const leaveInfo = [
  { name: 'request_number', label: 'Request Number' },
  {
    name: 'from_date',
    label: 'From date',
    getBodyContent: ({ from_date: fromDate }) => <span>{moment(fromDate).format('DD MMM YY')}</span>
  },
  {
    name: 'to_date',
    label: 'To date',
    getBodyContent: ({ to_date: toDate }) => <span>{moment(toDate).format('DD MMM YY')}</span>
  },
  { name: 'type', label: 'Type', path: 'type.code' },
  { name: 'duration', label: 'Duration', path: 'duration.code' },
  {
    name: 'leave_dates',
    label: 'Count',
    getBodyContent: ({ leave_dates: leaveDates }) => <div>{leaveDates.length} day(s)</div>,
    key: 'count'
  },
  {
    name: 'leave_dates',
    label: 'Leave Days',
    getBodyContent: ({ leave_dates: leaveDates }) => (
      <div className="leave-dates__body">
        {leaveDates.map((date) => (
          <div
            key={leaveDates}
            className=" leave-dates__item badge badge--primary sub-text text-overflow--ellipsis">
            {moment(date).format('DD-MM-YY')}
          </div>
        ))}
      </div>
    )
  }
];
const tableColumns = {
  myLeaveInfo: [...leaveInfo],
  approvalLeaveInfo: [
    { name: 'requestorName', label: 'Requestor Name', path: 'employee.name' },
    {
      name: 'requestorEmail',
      label: 'Requestor Email',
      path: 'employee.email'
    },

    ...leaveInfo
  ]
};
export default tableColumns;
