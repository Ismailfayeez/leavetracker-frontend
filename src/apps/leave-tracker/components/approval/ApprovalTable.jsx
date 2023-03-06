import React, { useState } from "react";
import getApprovalTableColumns from "./tableColumns";
import NoResult from "../../../../ui-kit/no-result/NoResult";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import { leaveTrackerModalNames } from "../../leaveTracker.constants";
import LeaveRequestCard from "../../../../ui-kit/cards/apps/leavetracker/leave-request-card/LeaveRequestCard";
import Table from "../../../../ui-kit/Table/Table";
import Pagination from "../../../../ui-kit/pagination/Pagination";
import { paginate } from "../../../../utilities/paginate";
import { motion as m } from "framer-motion";
import { listVariant } from "../../../../utilities/AnimateVariants";

function ApprovalTable({ data, ...others }) {
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setCurrentPageSize] = useState(5);
  const handleCurrentPage = (pageNumber) => setCurrentPage(pageNumber);
  const { approvalLeaveInfo, approvalLeaveApproverStatus } =
    leaveTrackerModalNames;
  const handleInfoModal = (leave) => {
    openModal();
    moveToNextNav({ leave, name: others.name }, approvalLeaveInfo);
  };
  const handleApproverStatusModal = (leave) => {
    openModal();
    moveToNextNav({ id: leave.id }, approvalLeaveApproverStatus);
  };
  const paginatedData = paginate(data, currentPage, pageSize);
  if (data.length <= 0) return <NoResult statement="no approvals found" />;
  return (
    <div>
      <div className="display-mobile-only">
        <div className="grid grid-gap-10px grid--1x2 grid--tablet">
          {paginatedData.map((leave) => (
            <m.div
              variants={listVariant}
              layout
              initial="hidden"
              animate="visible"
            >
              <LeaveRequestCard
                leave={leave}
                handleRequest={handleInfoModal}
                handleStatus={handleApproverStatusModal}
                className="card--desert"
                {...others}
              />
            </m.div>
          ))}
        </div>
      </div>
      <div className="display-tablet">
        <Table
          data={paginatedData}
          columns={getApprovalTableColumns({
            handleInfoModal,
            handleApproverStatusModal,
            prevItemIndex: (currentPage - 1) * pageSize,
          })}
          className="approval table table--transparant table--header-desert"
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

export default ApprovalTable;
