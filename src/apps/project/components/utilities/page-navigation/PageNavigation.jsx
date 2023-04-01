import React, { useMemo, useState } from 'react';
import { PageNavContext } from '../../../../../utilities/context/PageNavContext';
import RenderPages from '../render-pages/RenderPages';

function PageNavigation({ defaultPage, pages, ...otherProps }) {
  const [currentPage, setCurrentPage] = useState(defaultPage || '');
  const [pageList, setPageList] = useState([]);
  const memoizedState = useMemo(
    () => ({ pageList, setPageList, currentPage, setCurrentPage }),
    [currentPage, pageList]
  );
  return (
    <PageNavContext.Provider value={memoizedState}>
      <RenderPages pages={pages} {...otherProps} />
    </PageNavContext.Provider>
  );
}

export default PageNavigation;
