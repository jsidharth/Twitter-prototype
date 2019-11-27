import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';
import { searchActions } from '../../js/actions/index';
import UserCard from '../UserCard/UserCard';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
    };
  }

  handleOnInputChange = event => {
    const userHandle = event.target.value;
    if (userHandle[0] === '@' && userHandle.length > 1) {
      this.props.getSearchSuggestions(userHandle);
    } else {
      this.setState({
        suggestions: [],
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      suggestions: nextProps.searchSuggestions,
    });
  }

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
            autoComplete="off"
            onChange={this.handleOnInputChange}
          />
        </div>
        <div className="searchSuggestion">
          {this.state.suggestions && this.state.suggestions.length
            ? this.state.suggestions.map(user => {
                return (
                  <div>
                    <UserCard user={user} long={false}></UserCard>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchSuggestions: state.search.searchSuggestions,
  };
};

const mapDispatchToProps = dispatch => ({
  getSearchSuggestions: data => dispatch(searchActions.getSearchSuggestions(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
