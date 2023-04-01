import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectedUsers from './SelectedUsers';
import { loadData } from '../../../../../store/common/dispatchMethods';
import { AddQueryParamToUrl } from '../../../../../utilities/queryParamGenerator';
import { EMPLOYEE_URL } from '../../../apiConstants';
import SearchList from '../search-list/SearchList';
import './addUsers.scss';

function AddUsers({ handleSubmit, existingMembers }) {
  const [displaySelectedPage, setDisplaySelectedPage] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const onSearch = (input) =>
    dispatch(loadData(AddQueryParamToUrl(EMPLOYEE_URL, { search: input.value })));

  const handleSelected = (selectedData) => {
    setData(selectedData);
    setDisplaySelectedPage(!displaySelectedPage);
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
        <SearchList
          onSearch={onSearch}
          handleSelected={handleSelected}
          existingList={existingMembers}
          existingListMatchField="email"
          idField="id"
          titleField="name"
          subTitleField="email"
        />
      )}
    </div>
  );
}

export default AddUsers;
