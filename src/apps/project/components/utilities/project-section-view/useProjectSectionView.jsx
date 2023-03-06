import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  closeSectionDetail,
  deleteSectionDetail,
} from "../../../store/projects";
import { usePageNav } from "../../../../../utilities/hooks/usePageNav";
import { PageNavContext } from "../../../../../utilities/context/PageNavContext";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import { closed } from "../../../../leave-tracker/leaveTracker.constants";
export const useProjectSectionView = (sectionConstants, sectionId) => {
  const dispatch = useDispatch();
  const { name, baseUrl, nestedUrlPathName, primaryField } = sectionConstants;
  const [{ moveToNextPage, moveToPrevPage }] = usePageNav(PageNavContext);
  const [{ closeModal }] = useModalNav(ModalNavContext);
  const sectionData = useSelector(
    (state) => state.entities.projects.core[name]
  );

  const handleRemoveData = async (methodType) => {
    let toastMessage = "";
    const record = sectionData.list.find((item) => item.id == sectionId);

    const primaryFieldVal = (record && record[primaryField]) || "";
    try {
      if (methodType == "close") {
        await dispatch(
          closeSectionDetail({
            baseUrl,
            nestedUrlPathName,
            id: sectionId,
            name,
            data: { status: closed.code },
          })
        );
      } else {
        await dispatch(
          deleteSectionDetail({
            baseUrl,
            name,
            nestedUrlPathName,
            id: sectionId,
          })
        );
      }
    } catch (err) {
      return;
    }
    closeModal();

    toastMessage = `${name} ${primaryFieldVal} ${
      methodType == "close" ? "closed" : "deleted"
    }
  ${" "} successfully`;
    toast.success(<span className="toast-msg">{toastMessage}</span>);
  };
  const handleDelete = () => handleRemoveData();
  const handleClose = () => handleRemoveData("close");
  return [
    sectionData,
    handleDelete,
    handleClose,
    moveToNextPage,
    moveToPrevPage,
  ];
};
