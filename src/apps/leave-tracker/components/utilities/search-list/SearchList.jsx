import _ from "lodash";
import React, { useState } from "react";
import ListItemCard from "../../../../../ui-kit/cards/list-item-card/ListItemCard";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import SearchBar from "../../../../../ui-kit/search-bar/SearchBar";

function SearchList({
  onSearch,
  handleSelected,
  existingList,
  idField,
  titleField,
  subTitleField,
}) {
  const [searchedData, setSearchedData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChecked = ({ currentTarget: input }, checkedItem) => {
    console.log(input);
    if (input.checked) {
      setSelectedData([...selectedData, checkedItem]);
    } else {
      let index = selectedData.findIndex((item) => item.id == checkedItem.id);
      let newData = [...selectedData];
      newData.splice(index, 1);
      setSelectedData(newData);
    }
  };
  const handleSearch = _.debounce(async ({ target: input }) => {
    if (!input.value) return setSearchedData([]);
    try {
      setIsLoading(true);
      const response = await onSearch(input);
      setSearchedData(response.data);
    } catch (err) {}
    setIsLoading(false);
  }, 1000);
  return (
    <div>
      <SearchBar onChange={handleSearch} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div style={{ margin: "0.5rem 1rem" }}>
            {searchedData.length > 0 && (
              <span
                className="search-page__total-results"
                style={{ fontSize: "1.8rem" }}
              >
                {searchedData.length} total results &nbsp;&nbsp;
              </span>
            )}

            {selectedData.length > 0 && (
              <span
                className="selected-badge sub-text badge badge--accent"
                style={{ margin: "0.5rem 0" }}
                onClick={() => handleSelected(selectedData)}
              >
                selected {selectedData.length}
              </span>
            )}
          </div>
          <div className="flex-item-grow flex flex--column overflow--auto">
            {searchedData.map((searchedItem) => (
              <ListItemCard
                id={searchedItem[idField]}
                title={searchedItem[titleField]}
                subTitle={searchedItem[subTitleField]}
                enableCheckbox
                checked={selectedData.some(
                  (selectedItem) =>
                    selectedItem[idField] == searchedItem[idField]
                )}
                disableCheckBoxInput={existingList.some(
                  (existingItem) =>
                    existingItem[idField] == searchedItem[idField]
                )}
                handleChecked={(e) => handleChecked(e, searchedItem)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SearchList;
