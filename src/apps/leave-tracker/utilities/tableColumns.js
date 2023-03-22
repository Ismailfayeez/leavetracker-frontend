import moment from "moment";
const leaveInfo = [
  { name: "request_number", label: "Request Number" },
  {
    name: "from_date",
    label: "From date",
    getBodyContent: ({ from_date }) => (
      <span>{moment(from_date).format("DD MMM YY")}</span>
    ),
  },
  {
    name: "to_date",
    label: "To date",
    getBodyContent: ({ to_date }) => (
      <span>{moment(to_date).format("DD MMM YY")}</span>
    ),
  },
  { name: "type", label: "Type", path: "type.code" },
  { name: "duration", label: "Duration", path: "duration.code" },
  {
    name: "leave_dates",
    label: "Count",
    getBodyContent: ({ leave_dates }) => <div>{leave_dates.length} day(s)</div>,
  },
  {
    name: "leave_dates",
    label: "Leave Days",
    getBodyContent: ({ leave_dates }) => (
      <div className="leave-dates__body">
        {leave_dates.map((date) => (
          <div className=" leave-dates__item badge badge--primary sub-text text-overflow--ellipsis">
            {moment(date).format("DD-MM-YY")}
          </div>
        ))}
      </div>
    ),
  },
];
const tableColumns = {
  myLeaveInfo: [...leaveInfo],
  approvalLeaveInfo: [
    { name: "requestorName", label: "Requestor Name", path: "employee.name" },
    {
      name: "requestorEmail",
      label: "Requestor Email",
      path: "employee.email",
    },

    ...leaveInfo,
  ],
};
export default tableColumns;
