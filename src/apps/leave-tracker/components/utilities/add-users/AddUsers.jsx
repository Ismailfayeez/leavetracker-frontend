import React, { useState } from "react";
import SearchUsers from "./SearchUsers";
import SelectedUsers from "./SelectedUsers";
import "./addUsers.scss";
import { loadData } from "../../../../../store/common/dispatchMethods";
import { AddQueryParamToUrl } from "../../../../../utilities/queryParamGenerator";
import { employeeUrl } from "../../../apiConstants";
import _ from "lodash";
import { useDispatch } from "react-redux";
function AddUsers({ title, handleSubmit, existingMembers }) {
  const [displaySelectedPage, setDisplaySelectedPage] = useState(false);
  const [searchedResult, setSearchedResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const handleSearchQuery = _.debounce(async ({ target: input }) => {
    if (!input.value) return setSearchedResult([]);
    try {
      setIsLoading(true);
      const response = await dispatch(
        loadData(AddQueryParamToUrl(employeeUrl, { search: input.value }))
      );
      setSearchedResult(response.data);
    } catch (err) {}
    setIsLoading(false);
  }, 1000);

  const handleChecked = ({ currentTarget: input }, user) => {
    if (input.checked) {
      setData([...data, user]);
    } else {
      let index = data.findIndex((member) => member.email == user.email);
      let newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  return (
    <div className="add-users full-height">
      {displaySelectedPage && (
        <SelectedUsers
          selectedUsers={data}
          setDisplaySelectedPage={setDisplaySelectedPage}
          handleSubmit={() => handleSubmit(data)}
        />
      )}

      {!displaySelectedPage && (
        <SearchUsers
          data={data}
          existingMembers={existingMembers}
          setDisplaySelectedPage={setDisplaySelectedPage}
          handleChecked={handleChecked}
          searchedResult={searchedResult}
          handleSearchQuery={handleSearchQuery}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default AddUsers;
