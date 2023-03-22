import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  createYearList,
  createDateList,
} from "../../../../../../utilities/helper";
import BarChartWithSelect from "../../../../../../ui-kit/charts/bar-chart/bar-chart-with-select/BarChartWithSelect";
import { TEAM_ANALYSIS_URL } from "../../../../apiConstants";
import { AddQueryParamToUrl } from "../../../../../../utilities/queryParamGenerator";
import {
  groupLevelAnalysisCleared,
  cacheUpdated,
  loadAbsenteesGroupLevelAnalysis,
} from "../../../../store/absentees";
import "./absenteesGraph.scss";

function AbsenteesGraph({ groupId }) {
  const dispatch = useDispatch();
  const yearList = createYearList(10).map((year) => ({
    value: year,
    name: year,
  }));
  const monthsList = moment
    .monthsShort()
    .map((month, index) => ({ value: index + 1, name: month }));
  const groupLevelAnalysis = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.absentees
        .groupLevelAnalysis
  );
  const { data: graphData, isLoading } = groupLevelAnalysis;
  const myGroups = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.groups["myGroups"]
  );
  const myGroupsCache = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.absentees.cache[
        "myGroups"
      ]
  );

  const myLeaves = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.leaves.myLeaves
  );

  const myLeavesCache = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.absentees.cache[
        "myLeaves"
      ]
  );
  const isMyGroupsFetchedOrModified =
    myGroups.lastFetch != myGroupsCache.lastFetch ||
    myGroups.lastModified != myGroupsCache.lastModified;

  const isMyLeavesFetchedOrModified =
    myLeaves.lastFetch != myLeavesCache.lastFetch ||
    myLeaves.lastModified != myLeavesCache.lastModified;

  const isDataFetchedOrModified =
    isMyGroupsFetchedOrModified || isMyLeavesFetchedOrModified;

  const dataInitialState = {
    startDate: "",
    endDate: "",
    month: monthsList[moment().month()].value,
    year: yearList[0].value,
  };
  const optionsIntialState = {
    yearList: [...yearList],
    monthList: [...monthsList],
    dateList: [],
  };
  const [data, setData] = useState({ ...dataInitialState });
  const [options, setOptions] = useState({ ...optionsIntialState });
  const { year, month, startDate, endDate } = data;
  const baseUrl = TEAM_ANALYSIS_URL + groupId + "/" + "member/";

  useEffect(() => {
    if (isDataFetchedOrModified) {
      dispatch(groupLevelAnalysisCleared());
      dispatch(
        cacheUpdated({
          data: {
            lastFetch: myGroups.lastFetch,
            lastModified: myGroups.lastModified,
          },
          sectionName: "myGroups",
        })
      );
      dispatch(
        cacheUpdated({
          data: {
            lastFetch: myLeaves.lastFetch,
            lastModified: myLeaves.lastModified,
          },
          sectionName: "myLeaves",
        })
      );
    }
  }, [isDataFetchedOrModified]);

  useEffect(() => {
    if (!isDataFetchedOrModified && groupId && year) {
      if (_.get(graphData, [groupId, year])) return;
      dispatch(
        loadAbsenteesGroupLevelAnalysis({
          api: AddQueryParamToUrl(baseUrl, {
            type: "year",
            year: data.year,
          }),
          groupId,
          recordName: year,
          sectionName: "year",
        })
      );
    }
  }, [isDataFetchedOrModified, year, groupId]);

  useEffect(() => {
    if (!isDataFetchedOrModified && groupId && year && month) {
      let dateList = createDateList(month, year);
      setOptions((prevOptions) => ({ ...prevOptions, dateList }));
      setData((prevData) => ({
        ...prevData,
        startDate: dateList[0],
        endDate: dateList[dateList.length - 1],
      }));
      if (!_.get(graphData, [groupId, `${year}-${month}`])) {
        dispatch(
          loadAbsenteesGroupLevelAnalysis({
            api: AddQueryParamToUrl(baseUrl, {
              type: "month",
              year: year,
              month: month,
            }),
            groupId,
            recordName: `${year}-${month}`,
            sectionName: "month",
          })
        );
      }
    }
  }, [isDataFetchedOrModified, year, month, groupId]);

  useEffect(() => {
    if (!isDataFetchedOrModified && groupId && startDate && endDate) {
      if (_.get(graphData, [groupId, `${startDate}-${endDate}`])) return;
      dispatch(
        loadAbsenteesGroupLevelAnalysis({
          api: AddQueryParamToUrl(baseUrl, {
            type: "date",
            "start-date": startDate,
            "end-date": endDate,
          }),
          groupId,
          recordName: `${startDate}-${endDate}`,
          sectionName: "day",
        })
      );
    }
  }, [isDataFetchedOrModified && startDate, endDate, groupId]);

  const handleChange = ({ target: input }) =>
    setData({ ...data, [input.name]: input.value });

  const yearStateGraphData = _.get(graphData, `${groupId}.${year}`, []);
  const monthStateGraphData = _.get(
    graphData,
    `${groupId}.${year}-${month}`,
    []
  );
  const dayStateGraphData = _.get(
    graphData,
    `${groupId}.${startDate}-${endDate}`,
    []
  );
  return (
    <div className="absentees-graph">
      <div className="grid grid--1x2 gap--20px grid--center grid--tablet-hr">
        <BarChartWithSelect
          className="bg--purple"
          barColor="#813a78"
          label="Yearly view"
          select={[
            {
              name: "year",
              options: options.yearList,
              optionKeys: { value: "value", name: "name" },
              data,
              handleChange,
            },
          ]}
          graph={{
            data: yearStateGraphData,
            defaultMsg: "No Leaves",
            isLoading: isLoading["year"],
          }}
        />

        <BarChartWithSelect
          className="bg--pale-green"
          label="Monthly View"
          barColor="#58864f"
          select={[
            {
              name: "month",
              options: options.monthList,
              optionKeys: { value: "value", name: "name" },
              data,
              handleChange,
            },
          ]}
          graph={{
            data: monthStateGraphData,
            defaultMsg: "No Leaves",
            isLoading: isLoading["month"],
          }}
        />

        <BarChartWithSelect
          className="bg--desert"
          barColor="#928748"
          label="Day view"
          select={[
            {
              name: "startDate",
              options: options.dateList,
              data,
              handleChange,
            },
            {
              name: "endDate",
              options: options.dateList,
              data,
              handleChange,
            },
          ]}
          graph={{
            data: dayStateGraphData,
            defaultMsg: "No Leaves",
            isLoading: isLoading["day"],
          }}
        />
      </div>
    </div>
  );
}

export default AbsenteesGraph;
