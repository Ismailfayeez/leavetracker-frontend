import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  loadCoreDataDetail,
  resetCoreDetail,
  resetCoreList,
} from "../../store/projects";
function useProjectDetail(sectionConstants, sectionId) {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { baseUrl, name, nestedUrlPathName } = sectionConstants;

  const fetchData = async () => {
    try {
      if (!isLoading) setIsLoading(true);
      if (sectionId == "new") {
        setIsLoading(false);
        return;
      }
      await dispatch(
        loadCoreDataDetail({ baseUrl, name, nestedUrlPathName, id: sectionId })
      );
    } catch (err) {}
    if (isLoading) setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
    return () => {
      dispatch(resetCoreDetail({ name }));
    };
  }, []);
  return [isLoading];
}

export default useProjectDetail;
