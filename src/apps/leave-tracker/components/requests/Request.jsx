import React, { useState, useEffect } from "react";
import RequestForm from "./RequestForm";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import requestFormSchema from "./requestForm.schema";
import "./request.scss";
import useValidator from "../../../../utilities/hooks/useValidator";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createLeaveRequest } from "../../store/status";
import { loadEmployeeAdditionalInfo } from "../../store/employeeProfile";
import {
  leaveTrackerModalNames,
  LEAVETRACKER_SECTION_NAMES,
} from "../../leaveTracker.constants";
import { addLeaveBalance } from "../utilities/leaveBalanceCalculator";
import { useModalNav } from "../../../../utilities/hooks/useModalNav";
import { ModalNavContext } from "../../../../utilities/context/ModalNavContext";
import "./request.scss";
import {
  EMPLOYEE_URL,
  LEAVE_BALANCE_URL,
  REQUEST_URL,
} from "../../apiConstants";
import useAutoCompleteSuggestions from "../../../../utilities/hooks/useAutoCompleteSuggestions";
import LeaveBalanceTable from "./leave-balance-table/LeaveBalanceTable";
import Modal from "../../../../ui-kit/modal/Modal";
function Request(props) {
  const dispatch = useDispatch();
  const initialStateData = {
    from: "",
    to: "",
    leaveType: "",
    leaveDuration: "",
    reachoutPerson: "",
    leaveReason: "",
    dateList: [],
  };
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [displayLeaveBalance, setDisplayLeaveBalance] = useState(false);
  const autoCompleteFields = ["reachoutPerson"];
  const autoCompleteFieldDetails = {
    reachoutPerson: { url: EMPLOYEE_URL, valueField: "email" },
  };

  const currentEmployee = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile
        .currentEmployee
  );
  const coreData = useSelector(
    (state) => state.entities.leaveTracker.employeeAccountData.core
  );
  const dropDownOptions = {
    leaveType: coreData.leaveType,
    leaveDuration: coreData.leaveDuration,
  };
  const approvers = useSelector(
    (state) =>
      state.entities.leaveTracker.employeeAccountData.employeeProfile
        .currentEmployee.data.approvers
  );
  const { leaveBalance } = currentEmployee.data;

  const [data, setData] = useState({ ...initialStateData });
  const [leaveBalanceCopy, setLeaveBalanceCopy] = useState([]);

  const [errors, setErrors, validateForm, validateProperty] = useValidator(
    data,
    requestFormSchema
  );
  const {
    clearSuggestions,
    fetchSuggestions,
    suggestions,
    isSuggestionsLoading,
  } = useAutoCompleteSuggestions(autoCompleteFields, autoCompleteFieldDetails);
  const [{ openModal, moveToNextNav }] = useModalNav(ModalNavContext);

  const optionKeys = { name: "name", value: "code" };

  useEffect(() => {
    setLeaveBalanceCopy([...leaveBalance]);
  }, [leaveBalance]);

  useEffect(() => {
    const newDateList = updateLeaveList(data.from, data.to);
    setData({ ...data, dateList: [...newDateList] });
  }, [data.from, data.to]);

  useEffect(() => {
    const { dateList, leaveType } = data;
    if (dateList.length && leaveType) {
      const newLeaveBalance = addLeaveBalance(
        leaveBalance,
        leaveType,
        dateList.length
      );
      setLeaveBalanceCopy(newLeaveBalance);
    }
  }, [data.dateList, data.leaveType]);

  const updateLeaveList = (startDate, endDate) => {
    let sdt = moment(startDate, "YYYY-MM-DD");
    let edt = moment(endDate, "YYYY-MM-DD");
    let result = [];
    while (sdt <= edt) {
      result.push(sdt.format("YYYY-MM-DD"));
      sdt.add(1, "days");
    }
    return result;
  };

  const handleRemoveDate = (leave) => {
    const newDateList = data.dateList.filter((date) => date != leave);
    setData({ ...data, dateList: [...newDateList] });
  };
  const getLeaveList = () => {
    return data.dateList.map((leave, index) => (
      <span className="badge badge--primary leave-dates__item flex">
        <span
          className="flex-item-grow text-ellipsis"
          style={{ display: "inline-block" }}
        >
          {moment(leave).format("DD-MM-YY")}
        </span>
        {!(index == 0 || index == data.dateList.length - 1) && (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="remove cursor-pointer"
            onClick={() => handleRemoveDate(leave)}
          />
        )}
      </span>
    ));
  };
  const openLeaveBalanceModal = () => {
    openModal();
    moveToNextNav(leaveBalanceCopy, leaveTrackerModalNames.leaveBalance);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) return;
    try {
      setOnSubmitLoading(true);
      const postData = {
        from_date: data["from"],
        to_date: data["to"],
        type: data["leaveType"],
        reachout_person: data["reachoutPerson"],
        duration: data["leaveDuration"],
        reason: data["leaveReason"],
        leave_date_list: data["dateList"],
      };
      const response = await dispatch(
        createLeaveRequest({ url: REQUEST_URL, data: postData })
      );
      handleReset();
      dispatch(
        loadEmployeeAdditionalInfo({
          requestDetails: [{ url: LEAVE_BALANCE_URL, name: "leaveBalance" }],
        })
      );
      openModal();
      moveToNextNav(
        { request_number: response.data.request_number },
        leaveTrackerModalNames.requestSuccess
      );
    } catch (err) {}
    setOnSubmitLoading(false);
  };

  const handleBlur = ({ currentTarget: input }) => {
    validateProperty(input.name);
    if (autoCompleteFields.includes(input.name)) {
      clearSuggestions(input.name);
    }
  };
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    if (autoCompleteFields.includes(input.name)) {
      fetchSuggestions(input);
    }
  };
  const handleReset = (e) => {
    setData({ ...initialStateData });
    setErrors({});
  };
  const handleSelect = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    clearSuggestions(input.name);
  };
  return (
    <div className="leave-request grid--tablet-hr">
      <Modal
        open={displayLeaveBalance}
        handleClose={() => setDisplayLeaveBalance(false)}
        height="md"
        width="sm"
        title="Leave Balance"
      >
        <LeaveBalanceTable leaveBalance={leaveBalanceCopy} />
      </Modal>
      <div className="leave-request__form-container">
        <RequestForm
          data={data}
          errors={errors}
          leaveList={getLeaveList()}
          dropDownOptions={dropDownOptions}
          optionKeys={optionKeys}
          openLeaveBalanceModal={openLeaveBalanceModal}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSelect={handleSelect}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          suggestions={suggestions}
          isLoading={isSuggestionsLoading}
          onSubmitLoading={onSubmitLoading}
          setDisplayLeaveBalance={setDisplayLeaveBalance}
        />
      </div>
    </div>
  );
}

export default Request;
