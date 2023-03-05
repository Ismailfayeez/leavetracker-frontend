import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadCoreDataList, resetCoreList } from "../../../store/projects";

export const useProjectSection = (sectionConstants) => {
  console.log(sectionConstants);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, baseUrl, queryParamKey, nestedUrlPathName } = sectionConstants;
  const [searchQuery, setSearchQUery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector((state) => state.entities.projects.core[name]);
  const handleBack = () => navigate(-1);
  async function fetchData(queryVal) {
    if (queryVal) {
      try {
        setIsLoading(true);
        await dispatch(
          loadCoreDataList({
            baseUrl,
            name,
            nestedUrlPathName,
            queryParams: { [queryParamKey]: queryVal },
          })
        );
      } catch (err) {}
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      dispatch(resetCoreList({ name }));
    };
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        e.target.blur();
        setSearchQUery(e.target.value);
      }
    }
  };

  return [data, searchQuery, isLoading, handleSearch, handleBack];
};
