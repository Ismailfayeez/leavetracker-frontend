import React from "react";
import EmployeeCard from "../../../../../ui-kit/cards/apps/leavetracker/employee-card/EmployeeCard";
import LoadingScreen from "../../../../../ui-kit/loading/loadingScreen/LoadingScreen";
import SearchBar from "../../../../../ui-kit/search-bar/SearchBar";
import { sliceFirstLettersOfSentence } from "../../../../../utilities/helper";
function SearchUsers({
  searchedResult = [],
  existingMembers,
  handleSearchQuery,
  data,
  handleChecked,
  setDisplaySelectedPage,
  isLoading,
}) {
  return (
    <>
      <SearchBar onChange={handleSearchQuery} />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="" style={{ margin: "0.5rem 1rem" }}>
            {searchedResult.length > 0 && (
              <span
                className="search-page__total-results"
                style={{ fontSize: "1.8rem" }}
              >
                {searchedResult.length} total results &nbsp;&nbsp;
              </span>
            )}

            {data.length > 0 && (
              <span
                className="selected-badge badge badge--accent"
                onClick={() => setDisplaySelectedPage(true)}
              >
                selected {data.length}
              </span>
            )}
          </div>
          <div className="flex-item-grow flex flex--column overflow--auto">
            {searchedResult.map(({ name, email }) => (
              <EmployeeCard
                enableCheckBox={true}
                disableCheckBoxInput={existingMembers.some(
                  (member) => member.email == email
                )}
                checked={data.some((member) => member.email == email)}
                handleChecked={handleChecked}
                img={sliceFirstLettersOfSentence(name)}
                employee={{ name, email }}
                name={name}
                email={email}
                className="employee-card--theme-bluish-white"
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default SearchUsers;
