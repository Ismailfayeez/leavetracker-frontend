import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion as m } from 'framer-motion';
import moment from 'moment';
import AbsenteesGroupCountGraph from './absentees-group-count-graph/AbsenteesGroupCountGraph';
import CalenderPickerWeek from '../../../../../ui-kit/calenderPickerWeek/CalenderPickerWeek';
import SearchBar from '../../../../../ui-kit/search-bar/SearchBar';
import NoResult from '../../../../../ui-kit/no-result/NoResult';
import Pagination from '../../../../../ui-kit/pagination/Pagination';
import AbsenteeCard from '../../../../../ui-kit/cards/apps/leavetracker/absentee-card/AbsenteeCard';
import paginate from '../../../../../utilities/paginate';
import { getWeekDates } from '../../../../../utilities/dateUtils';
import {
  absenteesListCleared,
  loadAbsentees,
  cacheUpdated,
  loadAbsenteesCountByGroup,
  absenteesCountByGroupCleared
} from '../../../store/absentees';
import { loadGroups } from '../../../store/groups';
import useModalNav from '../../../../../utilities/hooks/useModalNav';
import ModalNavContext from '../../../../../utilities/context/ModalNavContext';
import {
  leaveTrackerModalNames,
  LEAVETRACKER_SECTION_NAMES
} from '../../../leaveTracker.constants';
import {
  ABSENTEES_COUNT_URL,
  ABSENTEES_URL,
  ALL_GROUPS_REPORT_EXCEL_URL,
  ALL_GROUPS_REPORT_URL,
  ALL_TEAM_URL
} from '../../../apiConstants';
import { ReactComponent as EngineeringTeamImg } from '../../../../../assets/images/engineering-team.svg';
import { listVariant, pageVariant } from '../../../../../utilities/AnimateVariants';
import { checkArrayStartsWith } from '../../../../../utilities/helper';
import { renderButton } from '../../../../../utilities/uiElements';
import { AddQueryParamToUrl } from '../../../../../utilities/queryParamGenerator';
import useFileDownload from '../../../../../utilities/hooks/useFileDownload';
import PieSkeleton from '../../../../../ui-kit/skeleton/pie-skeleton/PieSkeleton';
import AbsenteesSkeleton from '../../../../../ui-kit/skeleton/absentees-skeleton/AbsenteesSkeleton';
import './absentees.scss';

function Absentees() {
  const dispatch = useDispatch();
  const currentDate = moment();
  const [downloadPdfLoading, setDownloadPdfLoading] = useState(false);
  const [downloadExcelLoading, setDownloadExcelLoading] = useState(false);
  const [date, setDate] = useState(currentDate.format('YYYY-MM-DD'));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [pageSize] = useState(3);
  const absentees = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.absentees
  );
  const allGroups = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.allGroups
  );
  const [{ handleDownloadFile, handleDownloadPdf }] = useFileDownload();
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);
  const { list: absenteesList, cache } = absentees;
  const { data, isLoading } = absenteesList;
  const isDataFetchedOrModified =
    allGroups.lastFetch !== cache.allGroups.lastFetch ||
    allGroups.lastModified !== cache.allGroups.lastModified;

  const subscribedGroups = allGroups.list.filter((group) => group.subscribed === true);
  const absenteesData = data[date] || [];
  const filteredData = absenteesData.filter(({ name, team_list: teamList }) => {
    return (
      checkArrayStartsWith(name.split(' '), searchValue) ||
      checkArrayStartsWith(teamList, searchValue)
    );
  });
  const paginatedData = paginate(filteredData, currentPage, pageSize);

  const absenteesPdfReportUrl = AddQueryParamToUrl(ALL_GROUPS_REPORT_URL, {
    date: moment(date).format('DD-MM-YYYY')
  });
  const absenteesExcelReportUrl = AddQueryParamToUrl(ALL_GROUPS_REPORT_EXCEL_URL, {
    date: moment(date).format('DD-MM-YYYY')
  });
  const clearAbsenteesState = useCallback(async () => {
    await dispatch(absenteesListCleared());
    await dispatch(absenteesCountByGroupCleared());
    await dispatch(
      cacheUpdated({
        data: {
          lastFetch: allGroups.lastFetch,
          lastModified: allGroups.lastModified
        },
        sectionName: 'allGroups'
      })
    );
  }, [dispatch, allGroups.lastFetch, allGroups.lastModified]);
  const fetchData = useCallback(async () => {
    if (data[date]) return;
    try {
      await dispatch(loadAbsentees({ api: ABSENTEES_URL, date }));
      await dispatch(loadAbsenteesCountByGroup({ api: ABSENTEES_COUNT_URL, date }));
    } catch (er) {}
  }, [data, date, dispatch]);
  const handleAbsentDetailModal = (employeeId) => {
    openModal();
    moveToNextNav({ date, employeeId }, leaveTrackerModalNames.absenteeDetail);
  };
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
  };
  const handleNextWeek = () => {
    setDate(moment(date).add(7, 'days').format('YYYY-MM-DD'));
  };

  const handlePrevWeek = () => {
    setDate(moment(date).subtract(7, 'days').format('YYYY-MM-DD'));
  };
  useEffect(() => {
    dispatch(
      loadGroups({
        url: ALL_TEAM_URL,
        name: LEAVETRACKER_SECTION_NAMES.allGroups
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (isDataFetchedOrModified) {
      clearAbsenteesState();
    } else {
      fetchData();
    }
  }, [isDataFetchedOrModified, date, clearAbsenteesState, fetchData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [date, searchValue]);
  return subscribedGroups.length ? (
    <div className="absentees">
      <p className="absentees__selected-date bold">
        Absentees as of {moment(date).format('Do MMMM')}
      </p>
      <div className="flex flex--column " style={{ gap: '15px' }}>
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
        {isLoading && (
          <div className="grid grid--1x2-6fr-4fr grid--tablet gap--20px">
            <AbsenteesSkeleton />
            <PieSkeleton />
          </div>
        )}
        {!isLoading &&
          (absenteesData.length <= 0 ? (
            <m.div variants={pageVariant} initial="hidden" animate="visible" exit="hidden">
              <NoResult statement="No absentees found" illustration={EngineeringTeamImg} />
            </m.div>
          ) : (
            absenteesData.length > 0 && (
              <div>
                <m.div
                  className="grid grid--1x2-6fr-4fr grid--tablet gap--20px"
                  variants={pageVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden">
                  <div className="absentees__list">
                    <SearchBar
                      placeholder="search by name or group"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    {filteredData.length > 0 && (
                      <p className="absentees__count">{filteredData.length} member(s)</p>
                    )}
                    <div className="flex flex--column gap--10px">
                      {paginatedData.length ? (
                        paginatedData.map((absentee) => (
                          <m.div
                            key={absentee.employee}
                            variants={listVariant}
                            initial="hidden"
                            animate="visible">
                            <AbsenteeCard
                              name={absentee.name}
                              groups={absentee.team_list}
                              handleClick={() => handleAbsentDetailModal(absentee.employee)}
                            />
                          </m.div>
                        ))
                      ) : (
                        <NoResult statement="no members found" />
                      )}
                    </div>
                    <Pagination
                      itemsCount={filteredData.length}
                      currentPage={currentPage}
                      pageSize={pageSize}
                      onPageChange={(page) => setCurrentPage(page)}
                      paginationType="bullets"
                      displayButtonOnDisable={false}
                    />
                  </div>
                  <div className="absentees-group-count-graph-container">
                    <p
                      style={{
                        textAlign: 'center',
                        display: 'block',
                        fontSize: '1.6rem'
                      }}>
                      Absentees group by count
                    </p>
                    <AbsenteesGroupCountGraph date={date} />
                  </div>
                </m.div>
                <div className="btn-container flex--center" style={{ marginTop: '1rem' }}>
                  {renderButton({
                    content: 'PDF',
                    className: 'btn--sm btn--red',
                    onClick: () =>
                      handleDownloadPdf(
                        absenteesPdfReportUrl,
                        'absentees.pdf',
                        setDownloadPdfLoading
                      ),
                    loading: downloadPdfLoading ? 1 : 0
                  })}
                  {renderButton({
                    content: 'Excel',
                    className: 'btn--sm btn--green',
                    onClick: () =>
                      handleDownloadFile(
                        absenteesExcelReportUrl,
                        'absentees.xlsx',
                        setDownloadExcelLoading
                      ),
                    loading: downloadExcelLoading ? 1 : 0
                  })}
                </div>
              </div>
            )
          ))}
      </div>
    </div>
  ) : null;
}

export default Absentees;
