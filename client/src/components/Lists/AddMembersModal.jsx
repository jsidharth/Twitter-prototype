/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';
import { searchActions, listActions } from '../../js/actions/index';
import './AddMembersModal.css';

class AddMembersModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: {},
      listOfMembers: [],
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.addMembersToList = this.addMembersToList.bind(this);
    this.doneBtnHandler = this.doneBtnHandler.bind(this);
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      suggestions: nextProps.searchMembersForList,
    });
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleOnInputChange = event => {
    const { getSearchMembersForList } = this.props;
    const userHandle = event.target.value;
    if (userHandle[0] === '@' && userHandle.length > 1) {
      getSearchMembersForList(userHandle);
    } else {
      this.setState({
        suggestions: {},
      });
    }
  };

  addMembersToList = user => {
    const { listOfMembers } = this.state;
    this.setState({
      listOfMembers: listOfMembers.concat(user),
    });
  };

  doneBtnHandler = () => {
    const {
      listName,
      listDescription,
      userId,
      createList,
      showAddMembersModal,
      getLists,
      resetStatesAddListModal,
    } = this.props;
    const { listOfMembers } = this.state;
    const data = {
      name: listName,
      description: listDescription,
      members: listOfMembers,
      userId,
    };
    createList(data).then(() => {
      showAddMembersModal();
      getLists(userId);
      resetStatesAddListModal();
    });
  };

  closeButtonHandler = () => {
    const { showAddMembersModal, resetStatesAddListModal } = this.props;
    showAddMembersModal();
    resetStatesAddListModal();
  };

  render() {
    const { showAddMembersModalState } = this.props;
    const { suggestions, listOfMembers } = this.state;
    return (
      <Modal
        dialogClassName="addListModal"
        show={showAddMembersModalState}
        onHide={this.closeButtonHandler}
        centered
      >
        <Modal.Header closeButton>
          <button className="doneBtn" onClick={this.doneBtnHandler} type="button">
            Done
          </button>
          <Modal.Title className="newListTitle">Add members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="searchFlex">
            <div className="searchIcon">
              <FiSearch size={20} />
            </div>
            <input
              type="search"
              id="searchBar"
              className="searchMembersBar"
              placeholder="Search People"
              autoComplete="off"
              onChange={this.handleOnInputChange}
            />
          </div>
          {listOfMembers ? (
            <div className="flexMembersSelected">
              {listOfMembers.map(member => {
                return (
                  <div className="memberSelected">
                    <img
                      src={
                        member.profilePic ? member.profilePic : '/images/default_profile_bigger.png'
                      }
                      alt="profilePic"
                      className="memberSelectedImage"
                    />
                    <div className="memberSelectedName">{member.name}</div>
                  </div>
                );
              })}
            </div>
          ) : null}
          <div className="searchSuggestion">
            {suggestions && suggestions.length
              ? suggestions.map(user => {
                  return (
                    <div id={user._id} value={user} onClick={() => this.addMembersToList(user)}>
                      <div id={user._id} key={user._id}>
                        <div id={user._id}>
                          <div id={user._id} className="flexImageUser">
                            <div id={user._id}>
                              <img
                                id={user._id}
                                src={
                                  user.profilePic
                                    ? user.profilePic
                                    : '/images/default_profile_bigger.png'
                                }
                                className="userProfileImageCard"
                                alt="user"
                              />
                            </div>
                            <div>
                              <div id={user._id} className="flexNameHandleUserCard">
                                <p id={user._id} className="userCardUserName">
                                  {user.name}
                                </p>
                                <p id={user._id} className="userCardUserHandle">
                                  @{user.handle}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
    searchMembersForList: state.search.searchMembersForList.users,
    userId: state.user.currentUser._id,
  };
};

const mapDispatchToProps = dispatch => ({
  getSearchMembersForList: data => dispatch(searchActions.getSearchMembersForList(data)),
  createList: data => dispatch(listActions.createList(data)),
  getLists: data => dispatch(listActions.getLists(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMembersModal);
