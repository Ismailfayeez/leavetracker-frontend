import React from "react";
import InfoDisplayList from "../../../../../ui-kit/info-display-list/InfoDisplayList";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
function ApproverLeaveStatus({ isLoading, data }) {
  const columns = [
    {
      name: "name",
      label: "name",
      getLabelContent: (item) => <label>{item.name}</label>,
      getBodyContent: (item) => <span>{item.status}</span>,
    },
  ];
  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && data.length <= 0 && <div>No approvers found</div>}
      {!isLoading && (
        <>
          <InfoDisplayList
            data={data}
            columns={columns}
            className="flex flex--column gap--1rem"
          />
        </>
      )}
    </>
  );
}

export default ApproverLeaveStatus;
