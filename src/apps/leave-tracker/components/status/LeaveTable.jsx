import React from "react";
import { useState } from "react";
import LeaveRequestCard from "../../../../ui-kit/cards/apps/leavetracker/leave-request-card/LeaveRequestCard";
import NoResult from "../../../../ui-kit/no-result/NoResult";
import Pagination from "../../../../ui-kit/pagination/Pagination";
import Table from "../../../../ui-kit/Table/Table";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import { paginate } from "../../../../utilities/paginate";
import { leaveTrackerModalNames } from "../../leaveTracker.constants";
import getLeaveTableColumns from "./tableColumns";

function LeaveTable({ data, ...others }) {
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { leaveApproverStatus, leaveInfo } = leaveTrackerModalNames;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setCurrentPageSize] = useState(5);
  const handleCurrentPage = (pageNumber) => setCurrentPage(pageNumber);
  const handleInfoModal = (leave) => {
    openModal();
    moveToNextNav({ leave }, leaveInfo);
  };
  const handleApproverStatusModal = (leave) => {
    openModal();
    moveToNextNav({ id: leave.id }, leaveApproverStatus);
  };
  if (data.length <= 0) return <NoResult statement="No Record Found" />;
  const paginatedData = paginate(data, currentPage, pageSize);
  return (
    <div>
      <div className="display-mobile-only">
        <div className="grid grid-gap-10px grid--1x2 grid--tablet">
          {paginatedData.map((leave) => (
            <>
              <LeaveRequestCard
                leave={leave}
                handleRequest={handleInfoModal}
                handleStatus={handleApproverStatusModal}
                className="card--purple"
                {...others}
              />
            </>
          ))}
        </div>
      </div>
      <div className="display-tablet">
        <Table
          data={paginatedData}
          columns={getLeaveTableColumns({
            handleInfoModal,
            handleApproverStatusModal,
            prevItemIndex: (currentPage - 1) * pageSize,
            ...others,
          })}
          className="leave table table--transparant table--header-purple"
        />
      </div>
      <Pagination
        itemsCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handleCurrentPage}
      />
    </div>
  );
}

export default LeaveTable;
