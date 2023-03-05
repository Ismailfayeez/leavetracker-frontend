import React, { useState } from "react";
import { PageNavContext } from "../../../../../utilities/context/PageNavContext";
import RenderPages from "../../utilities/render-pages/RenderPages";
function ManageAccess({ defaultPage, pages, ...otherProps }) {
  const [pageList, setPageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(defaultPage || "");
  return (
    <PageNavContext.Provider
      value={{ pageList, setPageList, currentPage, setCurrentPage }}
    >
      <div className="project-section-detail full-height">
        <RenderPages pages={pages} {...otherProps} />
      </div>
    </PageNavContext.Provider>
  );
}

export default ManageAccess;
