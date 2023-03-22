import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import NoResult from "../../../../../ui-kit/no-result/NoResult";
import Pagination from "../../../../../ui-kit/pagination/Pagination";
import { paginate } from "../../../../../utilities/paginate";
import { ReactComponent as NoDataImg } from "../../../../../assets/images/no-data.svg";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import "./employeeInfo.scss";

function LeaveBalanceGraph(props) {
  const currentEmployee = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile
        .currentEmployee
  );
  const currentEmployeeData = currentEmployee.data;
  const employeeAdditionalInfoIsLoading =
    currentEmployee.employeeAdditionalInfoIsLoading;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setCurrentPageSize] = useState(4);
  const handleCurrentPage = (pageNumber) => setCurrentPage(pageNumber);
  const { leaveBalance } = currentEmployeeData;
  const paginatedData = paginate(leaveBalance, currentPage, pageSize);
  return employeeAdditionalInfoIsLoading ? (
    <LoadingScreen />
  ) : leaveBalance.length ? (
    <div className="leave-balance-graph-container">
      <div className="leave-balance-graph">
        <Pagination
          currentPage={currentPage}
          itemsCount={leaveBalance.length}
          pageSize={pageSize}
          onPageChange={handleCurrentPage}
          displayButtonOnDisable={false}
          paginationType="bullets"
        />
        <ResponsiveContainer width="100%" height="95%">
          <BarChart
            data={paginatedData}
            margin={{ top: 0, right: 0, left: -40, bottom: -5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="code" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="balance" fill="#376774" barSize={50} />
            <Bar dataKey="leave_taken" fill="#8bb9c7" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        leave balance graph
      </div>
    </div>
  ) : (
    <div>
      <NoResult
        statement="Leave type not added. contact project administrator."
        illustration={NoDataImg}
      />
    </div>
  );
}
export default LeaveBalanceGraph;
