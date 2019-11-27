/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';
import { searchActions } from '../../js/actions/index';
import UserCard from '../UserCard/UserCard';
import './NewMessageModal.css';
// eslint-disable-next-line react/prefer-stateless-function
class NewMessageModal extends Component {
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
            suggestions: {},
          });
        }
      };

    componentWillReceiveProps(nextProps) {
        this.setState({
          suggestions: nextProps.searchSuggestions,
        });
      }
  render() {
      console.log(this.state.suggestions)
    return (
      <Modal
        dialogClassName="messageModal"
        show={this.props.showMessageModalState}
        onHide={this.props.showMessageModal}
        centered
        // size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="searchPeopleToMessage">
          <div className="searchFlex">
            <div className="searchIcon">
              <FiSearch size={20} />
            </div>
            {/* <form className="searchForm" onSubmit={e => this.handleSearch(e)}> */}
              <input
                type="search"
                id="searchBar"
                className="searchBar"
                placeholder="Search People"
                autoComplete="off"
                onChange={this.handleOnInputChange}
              />
            {/* </form> */}
          </div>
          <div className="searchSuggestion">
          {this.state.suggestions && this.state.suggestions.length
            ? this.state.suggestions.map(user => {
                return (
                  <div>
                    <UserCard user={user} long></UserCard>
                  </div>
                );
              })
            : null}
        </div>
        </Modal.Body>
      </Modal>
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
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewMessageModal);


