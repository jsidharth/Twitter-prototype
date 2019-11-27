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
      suggestions: {},
      search: '',
    };
  }

  handleOnInputChange = event => {
    this.setState({ search: event.target.value });
    const userHandle = event.target.value;
    if (userHandle[0] === '@' && userHandle.length > 1) {
      this.props.getSearchSuggestions(userHandle);
    } else {
      this.setState({
        suggestions: [],
      });
    }
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.getSearchResults(this.state.search);
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
          <form className="searchForm" onSubmit={e => this.handleSearch(e)}>
            <input
              type="search"
              id="searchBar"
              className="searchBar"
              placeholder="Search Twitter"
              autoComplete="off"
              onChange={this.handleOnInputChange}
            />
          </form>
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
    searchSuggestions: state.search.searchSuggestions.users,
  };
};

const mapDispatchToProps = dispatch => ({
  getSearchSuggestions: data => dispatch(searchActions.getSearchSuggestions(data)),
  getSearchResults: data => dispatch(searchActions.getSearchResults(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
