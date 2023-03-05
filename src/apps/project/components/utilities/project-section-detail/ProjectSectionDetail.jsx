import React, { useState } from "react";
import useProjectDetail from "../../project-detail/useProjectDetail";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import "./projectSectionDetail.scss";
import PageNavigation from "../page-navigation/PageNavigation";
function ProjectSectionDetail({ addNewComponent, ...otherProps }) {
  const { sectionConstants, sectionId } = otherProps;
  const [isLoading] = useProjectDetail(sectionConstants, sectionId);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="project-section-detail full-height">
          {sectionId == "new" ? (
            React.cloneElement(addNewComponent, { ...otherProps })
          ) : (
            <PageNavigation {...otherProps} />
          )}
        </div>
      )}
    </>
  );
}

export default ProjectSectionDetail;
