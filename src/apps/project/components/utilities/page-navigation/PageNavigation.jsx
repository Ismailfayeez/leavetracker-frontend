import React, { useState } from "react";
import { PageNavContext } from "../../../../../utilities/context/PageNavContext";
import RenderPages from "../render-pages/RenderPages";

function PageNavigation({ defaultPage, pages, ...otherProps }) {
  const [currentPage, setCurrentPage] = useState(defaultPage || "");
  const [pageList, setPageList] = useState([]);
  return (
    <PageNavContext.Provider
      value={{ pageList, setPageList, currentPage, setCurrentPage }}
    >
      <RenderPages pages={pages} {...otherProps} />
    </PageNavContext.Provider>
  );
}

export default PageNavigation;
