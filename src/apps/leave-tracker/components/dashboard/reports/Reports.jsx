import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../../../../../store/common/dispatchMethods";
import CheckBox from "../../../../../ui-kit/check-box/CheckBox";
import { createYearList } from "../../../../../utilities/helper";
import { AddQueryParamToUrl } from "../../../../../utilities/queryParamGenerator";
import {
  renderButton,
  renderInput,
  renderSelect,
} from "../../../../../utilities/uiElements";
import { MY_GROUPS_REPORT_URL } from "../../../apiConstants";
function Reports(props) {
  const currentDate = moment().format("YYYY-MM-DD");
  const [sectionList, setSectionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const typeOptions = ["year", "month", "date"];
  const dispatch = useDispatch();
  const yearList = createYearList(10);
  const monthsList = moment
    .monthsShort()
    .map((month, index) => ({ value: index + 1, name: month }));
  const initialDataState = {
    startDate: currentDate,
    endDate: currentDate,
    year: yearList[0],
    month: monthsList[0].value,
    leaveDate: currentDate,
  };
  const [groupId, setGroupId] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [data, setData] = useState(initialDataState);
  const [displayReportInput, setDisplayReportInput] = useState(false);

  const myGroups = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.groups.myGroups
  );
  useEffect(() => {
    if (myGroups.list[0]) {
      setGroupId(myGroups.list[0].id);
    }
  }, [myGroups.list]);
  useEffect(() => {
    setData(initialDataState);
  }, [groupId]);

  const handleChange = ({ target: input }) => setGroupId(input.value);
  const handleCheckSections = ({ target: input }) => {
    console.log(input.checked, input.value);
    if (input.checked) {
      setSectionList([...sectionList, input.value]);
    } else {
      const data = [...sectionList];
      const index = data.findIndex((section) => section === input.value);
      data.splice(index, 1);
      setSectionList(data);
    }
  };
  const handleChangeType = ({ target: input }) => setType(input.value);
  const handleChangeData = ({ target: input }) =>
    setData({ ...data, [input.name]: input.value });
  const getLeavesLabel = () => <span>Leaves as of {data.leaveDate}</span>;
  const getLeaveCountLabelPeriod = () => {
    if (type == "date") {
      return (
        <span>
          date {data.startDate} to {data.endDate}
        </span>
      );
    }
    if (type == "month") {
      return (
        <span>
          month {moment(data.month).format("MMM")}, {data.year}
        </span>
      );
    }
    if (type == "year") {
      return <span>year {data.year}</span>;
    }
  };
  const getLeaveCountLabel = () => (
    <span>Leave count as of {getLeaveCountLabelPeriod()}</span>
  );
  const rendeLeaveCountPeriodInput = () => {
    console.log(type);
    if (type == "date") {
      return (
        <>
          {renderInput({
            name: "startDate",
            data,
            handleChange: handleChangeData,
            type: "date",
            label: "Start Date",
            className: "form-group--sm",
          })}
          {renderInput({
            name: "endDate",
            data,
            handleChange: handleChangeData,
            type: "date",
            label: "End Date",
            className: "form-group--sm",
          })}
        </>
      );
    }
    if (type == "month") {
      return (
        <>
          {renderSelect({
            name: "year",
            data,
            handleChange: handleChangeData,
            options: yearList,
            label: "Year",
            className: "form-group--sm",
          })}
          {renderSelect({
            name: "month",
            data,
            handleChange: handleChangeData,
            options: monthsList,
            optionKeys: { name: "name", value: "value" },
            label: "Month",
            className: "form-group--sm",
          })}
        </>
      );
    }
    if (type == "year") {
      return (
        <>
          {renderSelect({
            name: "year",
            data,
            handleChange: handleChangeData,
            options: yearList,
            label: "Year",
            className: "form-group--sm",
          })}
        </>
      );
    }
  };
  const getLeaveCountPeriodParams = () => {
    const { startDate, endDate, year, month } = data;
    if (type == "date") {
      return {
        type,
        "start-date": moment(startDate).format("DD-MM-YYYY"),
        "end-date": moment(endDate).format("DD-MM-YYYY"),
      };
    }
    if (type == "month") {
      return {
        type,
        year,
        month,
      };
    }
    if (type == "year") {
      return {
        type,
        year,
      };
    }
  };
  const handleSubmit = async () => {
    const sections = sectionList.join(",");
    const url = AddQueryParamToUrl(MY_GROUPS_REPORT_URL, {
      team: groupId,
      sections,
      date: moment(data.leaveDate).format("DD-MM-YYYY"),
      ...getLeaveCountPeriodParams(),
    });

    try {
      setLoading(true);
      const response = await dispatch(loadData(url));
      if (response.headers["content-type"] == "application/pdf") {
        const href = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", "my group analysis.pdf");
        document.body.appendChild(link);
        link.click();
        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }
    } catch (err) {
      console.log(err.response.data);
    }
    setLoading(false);
  };
  return myGroups.list.length ? (
    <div className="report">
      <header>
        <h4>Reports</h4>
      </header>
      <main className="grid gap--10px">
        {renderSelect({
          name: "groupId",
          label: "Group Name:",
          data: { groupId },
          handleChange,
          style: { maxWidth: "300px" },
          options: myGroups.list,
          optionKeys: { name: "name", value: "id" },
        })}
        <div className="flex flex--column">
          <label
            className="label"
            onClick={() => setDisplayReportInput(!displayReportInput)}
          >
            Report Inputs
            <FontAwesomeIcon
              icon={displayReportInput ? faChevronDown : faChevronUp}
              style={{
                marginLeft: "0.5rem",
              }}
            />
          </label>
          {displayReportInput && (
            <div className="leave-count-period">
              <div className="flex flex-wrap gap--10px">
                {renderSelect({
                  data: { type },
                  name: "type",
                  options: typeOptions,
                  onChange: handleChangeType,
                  label: "Period Type",
                  className: "form-group--sm",
                })}
                {rendeLeaveCountPeriodInput()}
                {renderInput({
                  type: "date",
                  name: "leaveDate",
                  data,
                  handleChange: handleChangeData,
                  label: "Leave date",
                  className: "form-group--sm",
                })}
              </div>
            </div>
          )}
        </div>
        <div className="report__section">
          <label className="label">Select sections to print in report:</label>
          <div className="grid grid--1x2 grid--tablet-hr">
            <CheckBox
              label={getLeavesLabel()}
              value={1}
              id={1}
              handleClick={handleCheckSections}
              checked={sectionList.includes("1")}
            />
            <CheckBox
              label={getLeaveCountLabel()}
              value={2}
              id={2}
              handleClick={handleCheckSections}
              checked={sectionList.includes("2")}
            />
          </div>
        </div>
        {renderButton({
          content: "Generate Report",
          onClick: handleSubmit,
          className: "btn--md btn--matte-black",
          loading,
        })}
      </main>
    </div>
  ) : null;
}

export default Reports;
