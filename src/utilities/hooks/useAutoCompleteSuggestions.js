import { debounce } from "lodash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadData } from "../../store/common/dispatchMethods";
import { mapDatawithfield } from "../helper";

export default function useAutoCompleteSuggestions(
  autoCompleteFields,
  autoCompleteFieldDetails
) {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState(
    mapDatawithfield({}, autoCompleteFields, [])
  );

  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(
    mapDatawithfield({}, autoCompleteFields, false)
  );
  const fetchSuggestions = debounce(async (input) => {
    if (!input.value)
      return setSuggestions({ ...suggestions, [input.name]: [] });
    if (autoCompleteFieldDetails[input.name]) {
      const {
        nameField,
        valueField,
        url: baseUrl,
      } = autoCompleteFieldDetails[input.name];
      const url = baseUrl + `?search=${input.value}`;
      try {
        setIsSuggestionsLoading({
          ...isSuggestionsLoading,
          [input.name]: true,
        });
        const response = await dispatch(loadData(url));
        setSuggestions({
          ...suggestions,
          [input.name]: response.data.map((item) => ({
            name: nameField ? item[nameField] : item["name"],
            value: valueField ? item[valueField] : item["value"],
          })),
        });
      } catch (err) {}
      setIsSuggestionsLoading({ ...isSuggestionsLoading, [input.name]: false });
    }
  }, 1000);

  const clearSuggestions = (name) => {
    setSuggestions({ ...suggestions, [name]: [] });
  };
  return {
    fetchSuggestions,
    clearSuggestions,
    suggestions,
    isSuggestionsLoading,
  };
}
