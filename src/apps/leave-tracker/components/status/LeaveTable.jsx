import React, { useState } from 'react';
import { motion as m } from 'framer-motion';
import LeaveRequestCard from '../../../../ui-kit/cards/apps/leavetracker/leave-request-card/LeaveRequestCard';
import NoResult from '../../../../ui-kit/no-result/NoResult';
import Pagination from '../../../../ui-kit/pagination/Pagination';
import Table from '../../../../ui-kit/Table/Table';
import { listVariant } from '../../../../utilities/AnimateVariants';
import ModalNavContext from '../../../../utilities/context/ModalNavContext';
import useModalNav from '../../../../utilities/hooks/useModalNav';
import paginate from '../../../../utilities/paginate';
import { leaveTrackerModalNames } from '../../leaveTracker.constants';
import getLeaveTableColumns from './tableColumns';

function LeaveTable({ data, ...others }) {
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { leaveApproverStatus, leaveInfo } = leaveTrackerModalNames;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
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
    <div className="leave-table">
      <div className="display--mobile-only">
        <div className="grid gap--10px grid--1x2 grid--tablet">
          {paginatedData.map((leave) => (
            <m.div key={leave.id} variants={listVariant} layout initial="hidden" animate="visible">
              <LeaveRequestCard
                leave={leave}
                handleRequest={handleInfoModal}
                handleStatus={handleApproverStatusModal}
                className="card--purple"
                {...others}
              />
            </m.div>
          ))}
        </div>
      </div>
      <div className="display--tablet">
        <Table
          data={paginatedData}
          columns={getLeaveTableColumns({
            handleInfoModal,
            handleApproverStatusModal,
            prevItemIndex: (currentPage - 1) * pageSize,
            ...others
          })}
          className="leave table--transparant table--header-purple"
        />
      </div>
      <Pagination
        itemsCount={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handleCurrentPage}
        displayButtonOnDisable={false}
      />
    </div>
  );
}

export default LeaveTable;
