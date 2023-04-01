import React, { useState } from 'react';
import _ from 'lodash';
import './pagination.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';

function BulletPagination({ itemsCount, pageSize, currentPage, onPageChange }) {
  const [currentPageNumberChunk, setCurrentPageNumberChunk] = useState(1);
  const pageNumberChunkCount = 4;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  const lastItem = pageNumberChunkCount * currentPageNumberChunk;
  const firstItem = lastItem - pageNumberChunkCount;
  const currentPages = pages.slice(firstItem, lastItem);

  const handleNext = () => setCurrentPageNumberChunk(currentPageNumberChunk + 1);
  const handlePrev = () => setCurrentPageNumberChunk(currentPageNumberChunk - 1);

  const isNext = currentPageNumberChunk * pageNumberChunkCount < pages.length;
  const isPrev = currentPageNumberChunk > 1;
  return (
    <nav>
      <ul className="bullet-pagination">
        <li
          onClick={isPrev ? handlePrev : null}
          className={`page-btn ${isPrev ? '' : 'disabled'}`}
          role="presentation">
          <FontAwesomeIcon icon={faGreaterThan} className="arrow-btn prev" />
          Prev
        </li>

        {currentPages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}
            onClick={() => onPageChange(page)}
            role="presentation"
          />
        ))}

        <li
          onClick={isNext ? handleNext : null}
          className={`page-btn ${isNext ? '' : 'disabled'}`}
          disabled
          role="presentation">
          Next
          <FontAwesomeIcon icon={faGreaterThan} className="arrow-btn" />
        </li>
      </ul>
    </nav>
  );
}

export default BulletPagination;
