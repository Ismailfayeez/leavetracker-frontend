import moment from "moment";

const getApprovalTableColumns = ({
  handleInfoModal,
  handleApproverStatusModal,
  prevItemIndex,
}) => {
  return [
    {
      path: "serial_no",
      label: "no",
      className: "serial-no",
      content: (approval, index) => <span>{prevItemIndex + index + 1}</span>,
    },
    {
      path: "request_number",
      label: "Request No",
      className: "approval__request-no cursor-pointer",
      content: (leave, index) => (
        <div>
          <div onClick={() => handleInfoModal(leave)} className="bold">
            {leave.request_number}
          </div>
          <div>{leave.employee.name}</div>
        </div>
      ),
    },
    {
      path: "range",
      label: "Range",
      className: "approval__range cursor-pointer",
      content: (leave) => (
        <div className="range">
          <div className="sub-text">From:</div>
          <div> {moment(leave.from_date).format("DD MMM YY")}</div>
          <div className="sub-text">To:</div>
          <div> {moment(leave.to_date).format("DD MMM YY")}</div>
        </div>
      ),
    },
    {
      path: "type.code",
      label: "type",
      className: "appproval__type display--tablet-hr",
    },
    {
      path: "duration.code",
      label: "duration",
      className: "display--tablet-hr",
    },
    {
      path: "your_status",
      label: "Your status ",
    },
    {
      path: "overall_status",
      label: "overall status",
      className: "overall-status cursor-pointer",
      content: (approval) => (
        <span
          onClick={() => handleApproverStatusModal(approval)}
          className="bold"
        >
          {approval.status}
        </span>
      ),
    },
  ];
};
export default getApprovalTableColumns;
