import React from "react";
import _ from "lodash";
import "./pagination.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";

function Pagination({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  paginationType = "numbered",
  displayButtonOnDisable = true,
}) {
  const [currentPageNumberChunk, setCurrentPageNumberChunk] = useState(1);
  const pageNumberChunkCount = 4;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  console.log(pagesCount);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  const lastItem = pageNumberChunkCount * currentPageNumberChunk;
  const firstItem = lastItem - pageNumberChunkCount;
  const currentPages = pages.slice(firstItem, lastItem);

  const handleNext = () =>
    setCurrentPageNumberChunk(currentPageNumberChunk + 1);
  const handlePrev = () =>
    setCurrentPageNumberChunk(currentPageNumberChunk - 1);

  const isNext = currentPageNumberChunk * pageNumberChunkCount < pages.length;
  const isPrev = currentPageNumberChunk > 1;
  return (
    <nav>
      <ul className={`pagination ${paginationType}`}>
        {(displayButtonOnDisable || isPrev) && (
          <li
            onClick={isPrev ? handlePrev : null}
            className={`page-btn ${isPrev ? "" : "disabled"}`}
          >
            <FontAwesomeIcon icon={faGreaterThan} className="arrow-btn prev" />
            {paginationType == "numbered" ? "Prev" : null}
          </li>
        )}
        {currentPages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            {paginationType == "numbered" ? page : null}
          </li>
        ))}

        {(displayButtonOnDisable || isNext) && (
          <li
            onClick={isNext ? handleNext : null}
            className={`page-btn ${isNext ? "" : "disabled"}`}
            disabled
          >
            {paginationType == "numbered" ? "Next" : null}
            <FontAwesomeIcon icon={faGreaterThan} className="arrow-btn" />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
