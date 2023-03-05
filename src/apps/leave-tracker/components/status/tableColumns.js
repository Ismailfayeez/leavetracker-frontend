import moment from "moment";
import { renderButton } from "../../../../utilities/uiElements";
const getLeaveTableColumns = ({
  handleInfoModal,
  handleApproverStatusModal,
  handleDelete,
  enableDelete,
  prevItemIndex,
}) => {
  return [
    {
      path: "serialNo",
      label: "no",
      className: "serial-no",
      content: (leave, index) => <span>{prevItemIndex + index + 1}</span>,
    },
    {
      path: "request_number",
      label: "Request No",
      className: "leave__request-no cursor-pointer",
      content: (leave, index) => (
        <span onClick={() => handleInfoModal(leave)} className="bold">
          {leave.request_number}
        </span>
      ),
    },
    {
      path: "range",
      label: "Range",
      className: "leave__range",
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
      label: "Type",
      className: "leave__type display--tablet-hr",
    },
    {
      path: "duration.code",
      label: "Duration",
      className: "leave__duration display--tablet-hr",
    },
    {
      path: "status",
      label: "Status",
      className: "leave__status cursor-pointer",
      content: (leave, index) => (
        <span onClick={() => handleApproverStatusModal(leave)} className="bold">
          {leave.status}
        </span>
      ),
    },
    {
      className: "leave-status__delete cursor-pointer",
      content: (leave) => {
        if (enableDelete && leave.is_delete)
          return renderButton({
            onClick: () => handleDelete(leave),
            content: "Delete",
            className: "btn--md btn--matte-black",
          });
      },
    },
  ];
};
export default getLeaveTableColumns;
