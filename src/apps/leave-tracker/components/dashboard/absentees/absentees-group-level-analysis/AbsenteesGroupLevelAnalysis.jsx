import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadGroups } from '../../../../store/groups';
import AbsenteesGraph from '../absentees-graph/AbsenteesGraph';
import { renderSelect } from '../../../../../../utilities/uiElements';
import { LEAVETRACKER_SECTION_NAMES } from '../../../../leaveTracker.constants';
import { MY_TEAM_URL } from '../../../../apiConstants';

function AbsenteesGroupLevelAnalysis() {
  const dispatch = useDispatch();
  const [groupId, setGroupId] = useState('');
  const myGroups = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.myGroups
  );
  useEffect(() => {
    dispatch(
      loadGroups({
        name: LEAVETRACKER_SECTION_NAMES.myGroups,
        url: MY_TEAM_URL
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (myGroups.list[0]) {
      setGroupId(myGroups.list[0].id);
    }
  }, [myGroups.list]);

  const handleChange = ({ target: input }) => setGroupId(input.value);

  return myGroups.list.length ? (
    <div className="absentees-group-level-analysis">
      <header>
        <h4>My Group analysis</h4>
      </header>
      <div className="flex flex--column gap--10px">
        {renderSelect({
          name: 'groupId',
          label: 'Group Name',
          data: { groupId },
          handleChange,
          style: { maxWidth: '300px' },
          options: myGroups.list,
          optionKeys: { name: 'name', value: 'id' }
        })}
        <AbsenteesGraph groupId={groupId} />
      </div>
    </div>
  ) : null;
}

export default AbsenteesGroupLevelAnalysis;
