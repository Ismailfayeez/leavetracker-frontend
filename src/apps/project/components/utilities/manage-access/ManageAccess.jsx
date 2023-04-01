import React, { useMemo, useState } from 'react';
import { PageNavContext } from '../../../../../utilities/context/PageNavContext';
import RenderPages from '../render-pages/RenderPages';

function ManageAccess({ defaultPage, pages, ...otherProps }) {
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(defaultPage || '');
  const memoizedState = useMemo(
    () => ({ currentPage, setCurrentPage, pageList, setPageList }),
    [pageList, currentPage]
  );
  return (
    <PageNavContext.Provider value={memoizedState}>
      <div className="project-section-detail full-height">
        <RenderPages pages={pages} {...otherProps} />
      </div>
    </PageNavContext.Provider>
  );
}

export default ManageAccess;
