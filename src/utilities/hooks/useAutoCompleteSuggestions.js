import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadData } from '../../store/common/dispatchMethods';
import { mapDatawithfield } from '../helper';

export default function useAutoCompleteSuggestions(autoCompleteFields, autoCompleteFieldDetails) {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState(mapDatawithfield({}, autoCompleteFields, []));

  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(
    mapDatawithfield({}, autoCompleteFields, false)
  );
  const fetchSuggestionsHandler = useCallback(
    async (input) => {
      if (!input.value)
        return setSuggestions((prevSuggestions) => ({ ...prevSuggestions, [input.name]: [] }));
      if (autoCompleteFieldDetails[input.name]) {
        const { nameField, valueField, url: baseUrl } = autoCompleteFieldDetails[input.name];
        const url = `${baseUrl}?search=${input.value}`;
        try {
          setIsSuggestionsLoading((prevIsSuggestionsLoading) => ({
            ...prevIsSuggestionsLoading,
            [input.name]: true
          }));
          const response = await dispatch(loadData(url));
          setSuggestions((prevSuggestions) => ({
            ...prevSuggestions,
            [input.name]: response.data.map((item) => ({
              name: nameField ? item[nameField] : item.name,
              value: valueField ? item[valueField] : item.value
            }))
          }));
        } catch (err) {}
        setIsSuggestionsLoading((prevIsSuggestionsLoading) => ({
          ...prevIsSuggestionsLoading,
          [input.name]: false
        }));
      }
      return null;
    },
    [dispatch, autoCompleteFieldDetails]
  );
  const fetchSuggestions = useMemo(
    () => debounce(fetchSuggestionsHandler, 1000),
    [fetchSuggestionsHandler]
  );
  const clearSuggestions = (name) => {
    setSuggestions((prevSuggestion) => ({ ...prevSuggestion, [name]: [] }));
  };
  return {
    fetchSuggestions,
    clearSuggestions,
    suggestions,
    isSuggestionsLoading
  };
}
