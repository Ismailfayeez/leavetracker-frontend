import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalenderPickerWeek from "../../../../../ui-kit/calenderPickerWeek/CalenderPickerWeek";
import { getWeekDates } from "../../../../../utilities/dateUtils";
import {
  absenteesListCleared,
  loadAbsentees,
  cacheUpdated,
  loadAbsenteesCountByGroup,
  absenteesCountByGroupCleared,
} from "../../../store/absentees";
import "./absentees.scss";
import SearchBar from "../../../../../ui-kit/search-bar/SearchBar";
import NoResult from "../../../../../ui-kit/no-result/NoResult";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import {
  leaveTrackerModalNames,
  LEAVETRACKER_SECTION_NAMES,
} from "../../../leaveTracker.constants";
import {
  ABSENTEES_COUNT_URL,
  ABSENTEES_URL,
  ALL_TEAM_URL,
} from "../../../apiConstants";
import AbsenteesGroupCountGraph from "./absentees-group-count-graph/AbsenteesGroupCountGraph";
import { useModalNav } from "../../../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../../../utilities/context/ModalNavContext";
import AbsenteeCard from "../../../../../ui-kit/cards/apps/leavetracker/absentee-card/AbsenteeCard";
import { loadGroups } from "../../../store/groups";
import Pagination from "../../../../../ui-kit/pagination/Pagination";
import { paginate } from "../../../../../utilities/paginate";
import { ReactComponent as EngineeringTeamImg } from "../../../../../assets/images/engineering-team.svg";

function Absentees(props) {
  const currentDate = moment();
  const [date, setDate] = useState(currentDate.format("YYYY-MM-DD"));
  const dispatch = useDispatch();
  const absentees = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.absentees
  );
  const { list: absenteesList, cache } = absentees;
  const { data, isLoading } = absenteesList;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const allGroups = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.allGroups
  );
  const isDataFetchedOrModified =
    allGroups.lastFetch != cache.allGroups.lastFetch ||
    allGroups.lastModified != cache.allGroups.lastModified;

  const subscribedGroups = allGroups.list.filter(
    (group) => group.subscribed == true
  );

  const clearAbsenteesState = async () => {
    await dispatch(absenteesListCleared());
    await dispatch(absenteesCountByGroupCleared());
    await dispatch(
      cacheUpdated({
        data: {
          lastFetch: allGroups.lastFetch,
          lastModified: allGroups.lastModified,
        },
        sectionName: "allGroups",
      })
    );
  };
  const fetchData = async () => {
    if (data[date]) return;
    try {
      await dispatch(loadAbsentees({ api: ABSENTEES_URL, date }));
      await dispatch(
        loadAbsenteesCountByGroup({ api: ABSENTEES_COUNT_URL, date })
      );
    } catch (er) {}
  };
  useEffect(() => {
    dispatch(
      loadGroups({
        url: ALL_TEAM_URL,
        name: LEAVETRACKER_SECTION_NAMES.allGroups,
      })
    );
  }, []);

  useEffect(() => {
    if (isDataFetchedOrModified) {
      clearAbsenteesState();
    } else {
      fetchData();
    }
  }, [isDataFetchedOrModified, date]);

  useEffect(() => {
    setCurrentPage(1);
  }, [date]);

  const handleAbsentDetailModal = (employeeId) => {
    openModal();
    moveToNextNav({ date, employeeId }, leaveTrackerModalNames.absenteeDetail);
  };
  const handleDateSelect = (date) => {
    setDate(date);
  };
  const handleNextWeek = () => {
    setDate(moment(date).add(7, "days").format("YYYY-MM-DD"));
  };

  const handlePrevWeek = () => {
    setDate(moment(date).subtract(7, "days").format("YYYY-MM-DD"));
  };
  const absenteesData = data[date] || [];
  const paginatedData = paginate(absenteesData, currentPage, pageSize);
  console.log(isLoading, isDataFetchedOrModified);
  return (
    <>
      {subscribedGroups.length ? (
        <div className="absentees">
          <h4 className="absentees__selected-date">
            {moment(date).format("Do MMMM")}
          </h4>
          <div className="flex flex--column gap--1rem">
            <div className="flex flex--center">
              <CalenderPickerWeek
                dateList={getWeekDates(date)}
                handleDateSelect={handleDateSelect}
                handlePrevWeek={handlePrevWeek}
                handleNextWeek={handleNextWeek}
                className="calendarPickerWeek--plain"
                activeDate={date}
              />
            </div>
            {isLoading && <LoadingScreen />}
            {!isLoading &&
              (data[date] && data[date].length <= 0 ? (
                <NoResult
                  statement={"No absentees found"}
                  illustration={EngineeringTeamImg}
                />
              ) : (
                data[date] &&
                data[date].length > 0 && (
                  <div className="grid grid--1x2-6fr-4fr grid--tablet gap--1rem">
                    <div className="absentees__list">
                      <SearchBar placeholder="search by name or group" />
                      <p className="absentees__count">
                        {data[date].length} member(s)
                      </p>
                      <div className="flex flex--column gap--1rem">
                        {paginatedData.map((absentee) => (
                          <AbsenteeCard
                            name={absentee.name}
                            groups={absentee.team_list}
                            handleClick={() =>
                              handleAbsentDetailModal(absentee.employee)
                            }
                          />
                        ))}
                      </div>
                      <Pagination
                        itemsCount={data[date].length}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                        paginationType="bullets"
                        displayButtonOnDisable={false}
                      />
                    </div>
                    <div className="absentees-group-count-graph-container">
                      <AbsenteesGroupCountGraph date={date} />
                      <label
                        style={{
                          textAlign: "center",
                          display: "block",
                          fontSize: "1.6rem",
                          // fontWeight: "bold",
                        }}
                      >
                        absentees group by count
                      </label>
                    </div>
                  </div>
                )
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Absentees;
