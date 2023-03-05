import React, { useState } from "react";
import { useEffect } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { paginate } from "../../../../utilities/paginate";
import { renderSelect } from "../../../../utilities/uiElements";
import LoadingSpinner from "../../../loading/loading-spinner/LoadingSpinner";
import NoResult from "../../../no-result/NoResult";
import Pagination from "../../../pagination/Pagination";
import "./barChartWithSelect.scss";

function BarChartWithSelect(props) {
  const {
    className,
    barColor,
    label,
    select,
    graph: { data, defaultMsg, isLoading },
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setCurrentPageSize] = useState(4);
  const handleCurrentPage = (pageNumber) => setCurrentPage(pageNumber);
  const paginatedData = paginate(data, currentPage, pageSize);
  console.log(paginatedData);
  useEffect(() => {
    console.log("changeee");
    setCurrentPage(1);
  }, [data]);
  return (
    <div className={`bar-chart-with-select ${className || ""}`}>
      <label
        className="bold"
        style={{ fontSize: "1.8rem", paddingBottom: "0.5rem" }}
      >
        {label}
      </label>
      <div className="bar-chart-container">
        {isLoading && <LoadingSpinner />}
        {!isLoading &&
          (data.length > 0 ? (
            <>
              <Pagination
                currentPage={currentPage}
                itemsCount={data.length}
                pageSize={pageSize}
                onPageChange={handleCurrentPage}
                displayButtonOnDisable={false}
                paginationType="bullets"
              />
              <ResponsiveContainer width="100%" height="90%">
                <BarChart
                  data={paginatedData}
                  margin={{ top: 0, right: 0, left: -40, bottom: -5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="leave_count"
                    fill={barColor || "#000000"}
                    barSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <NoResult statement="No leaves" />
          ))}
      </div>
      <div className="bar-chart-input flex flex-wrap gap--2rem flex--center">
        {select.map((item) => renderSelect({ ...item }))}
      </div>
    </div>
  );
}

export default BarChartWithSelect;
