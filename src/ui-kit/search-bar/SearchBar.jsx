import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './searchBar.scss';

function SearchBar(props) {
  return (
    <div className="searchBar">
      <input className="searchBar__input" {...props} />
      <FontAwesomeIcon icon={faMagnifyingGlass} className="searchBar__icon" />
    </div>
  );
}

export default SearchBar;
