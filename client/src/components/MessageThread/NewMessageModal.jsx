/* eslint-disable react/no-deprecated */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';
import { searchActions, messageActions } from '../../js/actions/index';
import './NewMessageModal.css';
// eslint-disable-next-line react/prefer-stateless-function
class NewMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: {},
    };
    this.composeMessage = this.composeMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      suggestions: nextProps.searchSuggestions,
    });
  }

  handleOnInputChange = event => {
    const { getSearchSuggestions } = this.props;
    const userHandle = event.target.value;
    if (userHandle[0] === '@' && userHandle.length > 1) {
      getSearchSuggestions(userHandle);
    } else {
      this.setState({
        suggestions: {},
      });
    }
  };

  composeMessage = e => {
    const { userId, composeMessage, getMessageDetails, showMessageModal } = this.props;
    const payload = {
      user_1: userId,
      user_2: e.target.id,
    };

    const data = {
      userId,
    };
    composeMessage(payload).then(() => {
      getMessageDetails(data).then(() => {
        showMessageModal();
      });
    });
  };

  render() {
    const { showMessageModalState, showMessageModal } = this.props;
    const { suggestions } = this.state;
    return (
      <Modal
        dialogClassName="messageModal"
        show={showMessageModalState}
        onHide={showMessageModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="searchPeopleToMessage">
          <div className="searchFlex">
            <div className="searchIcon">
              <FiSearch size={20} />
            </div>
            <input
              type="search"
              id="searchBar"
              className="searchBar"
              placeholder="Search People"
              autoComplete="off"
              onChange={this.handleOnInputChange}
            />
          </div>
          <div className="searchSuggestion">
            {suggestions && suggestions.length
              ? suggestions.map(user => {
                  return (
                    <div id={user._id} onClick={e => this.composeMessage(e)}>
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
    searchSuggestions: state.search.searchSuggestions.users,
    userId: state.user.currentUser._id,
  };
};

const mapDispatchToProps = dispatch => ({
  getSearchSuggestions: data => dispatch(searchActions.getSearchSuggestions(data)),
  composeMessage: data => dispatch(messageActions.composeMessage(data)),
  getMessageDetails: data => dispatch(messageActions.getMessageDetails(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMessageModal);
