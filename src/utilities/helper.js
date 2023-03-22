import _ from "lodash";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CACHING_TIME_IN_MINUTES } from "../apps/leave-tracker/leaveTracker.constants";
import { loadData } from "../store/common/dispatchMethods";

export const sliceFirstLettersOfSentence = (text, count = 1, capitalize) => {
  const result = text
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, count)
    .toUpperCase();
  if (capitalize) return result.toUpperCase();
  return result;
};
export const mapResponseToLocalKey = (keyObj, data) => {
  const newData = { ...data };
  Object.keys(newData).forEach((responseKey) => {
    const localKey = Object.keys(keyObj).find(
      (key) => keyObj[key] == responseKey
    );
    if (localKey && localKey != responseKey) {
      newData[localKey] = newData[keyObj[localKey]];
      delete newData[keyObj[localKey]];
    }
  });
  return newData;
};
export const extractArrayObjWithKey = (data, dataKey) =>
  data.map((item) => item[dataKey]);
export const createDateList = (monthId, year) => {
  const list = [];
  let totalDays = moment(monthId, "M").daysInMonth();
  while (totalDays) {
    let current = moment({
      year: year,
      month: monthId - 1,
      day: totalDays,
    }).format("DD-MM-YYYY");
    list.push(current);
    totalDays--;
  }

  return list.reverse();
};
export const createYearList = (count) => {
  const list = [];
  let year = moment().year();
  list.push(year);
  while (count) {
    year = moment().subtract(count, "years").year();
    list.push(year);
    count--;
  }
  return list;
};

export const compareTwoArrayOfObjects = (
  first_array_of_objects,
  second_array_of_objects
) => {
  return (
    first_array_of_objects.length === second_array_of_objects.length &&
    first_array_of_objects.every((element_1) =>
      second_array_of_objects.some((element_2) =>
        Object.keys(element_1).every((key) => element_1[key] === element_2[key])
      )
    )
  );
};

export const cachingTimeExpired = (lastFetchTime) => {
  if (typeof lastFetchTime !== "number") return true;
  const diffInSeconds = moment().diff(moment(lastFetchTime), "seconds");
  const diffInMinutes = diffInSeconds / 60;
  console.log(diffInMinutes, CACHING_TIME_IN_MINUTES);
  return diffInMinutes > CACHING_TIME_IN_MINUTES;
};

export const storeDataToLocal = (storeData, fields, defaultValue) => {
  const obj = {};
  fields.forEach(({ name, path }) => {
    obj[name] = _.get(storeData, path || name) || defaultValue || "";
  });
  return obj;
};

export const mapDatawithfield = (currentData, fields, defaultValue) => {
  const obj = {};
  fields.forEach((field) => {
    obj[field] =
      currentData[field] != undefined
        ? currentData[field]
        : defaultValue != undefined
        ? defaultValue
        : "";
  });
  return obj;
};

export const hasPermission = (permissions, expectedPermission) => {
  return permissions.includes(expectedPermission);
};

const displayFormattedData = (data, excludedKeys = []) => {
  if (Array.isArray(data))
    return data.map((item) => displayFormattedData(item, excludedKeys));
  else if (typeof data == "object" && data != null) {
    return Object.keys(data).map((key) => (
      <div>
        {!excludedKeys.includes(key) && (
          <div style={{ fontWeight: "bold" }}>{key}:</div>
        )}
        {displayFormattedData(data[key], excludedKeys)}
      </div>
    ));
  } else if (typeof data == "string") return <span>{data}</span>;
};

export const renderErrorData = (responseData) => {
  let dataToFormat = responseData;
  if (typeof responseData == "object" && responseData != null) {
    if (responseData.message || responseData.detail) {
      dataToFormat = responseData.message || responseData.detail;
    }
  }
  return displayFormattedData(dataToFormat, [
    "detail",
    "message",
    "non_field_errors",
    "error",
  ]);
};

export const updateExistingObjWithNewObj = (existingObj, newObj) => {
  for (let key of Object.keys(existingObj)) {
    if (newObj.hasOwnProperty(key)) {
      existingObj[key] = newObj[key];
    }
  }
  return existingObj;
};

export const getLastName = (name) => {
  const lastName = name.split(" ").reverse()[0];
  return lastName.charAt(0).toUpperCase() + lastName.slice(1);
};
export const getFirstName = (name) => {
  const lastName = name.split(" ")[0];
  return lastName.charAt(0).toUpperCase() + lastName.slice(1);
};

export const checkArrayStartsWith = (array, value) => {
  return array.some((i) => i.toLowerCase().startsWith(value.toLowerCase()));
};
