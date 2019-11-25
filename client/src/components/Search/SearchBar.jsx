import React, { Component } from 'react';
import './SearchBar.css';
import { FiSearch } from 'react-icons/fi';
class SearchBar extends Component {
     state = {};
  render() {
    return (
      <div className="searchContainer">
        <div className="searchFlex">
          <div className="searchIcon">
            <FiSearch size={20} />
          </div>
          <input
            type="search"
            className="searchBar"
            id="searchBar"
            placeholder="Search Twitter"
            autoComplete="on"
          ></input>
        </div>
      </div>
    );
  }
}

export default SearchBar;
