import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useProjectSection } from "./useProjectSection";
import SearchBar from "../../../../../ui-kit/search-bar/SearchBar";
import Table from "../../../../../ui-kit/Table/Table";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import NoResult from "../../../../../ui-kit/no-result/NoResult";
import "./projectSection.scss";
import AddButton from "../../../../../ui-kit/button/add-button/AddButton";
import Pagination from "../../../../../ui-kit/pagination/Pagination";
import { paginate } from "../../../../../utilities/paginate";

function ProjectSection({
  isPermissionAddNew,
  handleNew,
  sectionConstants,
  columns,
}) {
  const { label } = sectionConstants;
  const [sectionData, searchQuery, isLoading, handleSearch, handleBack] =
    useProjectSection(sectionConstants);
  const data = sectionData.list;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setCurrentPageSize] = useState(5);
  const handleCurrentPage = (pageNumber) => setCurrentPage(pageNumber);
  const paginatedData = paginate(data, currentPage, pageSize);
  return (
    <div className="project-section page-layout gap--1rem">
      <div className="page-layout__header">
        <div className="flex--space-between-align-center">
          <div className="flex--center">
            <div onClick={handleBack} className="back-arrow">
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <h4 className="project-section__title">{label}</h4>
          </div>
          {isPermissionAddNew && (
            <AddButton content={"Add"} onClick={handleNew} iconOnMobileScreen />
          )}
        </div>
      </div>
      <main className="page-layout___main">
        <div className="section__searchBar-container">
          <SearchBar
            onKeyDown={handleSearch}
            placeholder="type name or code..."
          />
          {data.length > 0 && (
            <p className="project-section__search-results-count">
              <span className="count">{data.length}</span> total results
            </p>
          )}
        </div>{" "}
        {isLoading && <LoadingScreen />}
        {!isLoading && (
          <div className="project-section__data-list">
            {searchQuery && data.length <= 0 && <NoResult />}
            {data.length > 0 && (
              <>
                <div>
                  <Table
                    data={paginatedData}
                    columns={columns}
                    className="table table--transparant padding-body"
                  />
                </div>
                <Pagination
                  itemsCount={data.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handleCurrentPage}
                />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectSection;
