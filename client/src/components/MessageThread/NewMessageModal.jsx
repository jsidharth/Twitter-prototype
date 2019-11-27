/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { FiSearch } from 'react-icons/fi';
import { connect } from 'react-redux';
import { searchActions, messageActions } from '../../js/actions/index';
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

    this.composeMessage = this.composeMessage.bind(this);

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

  composeMessage = (e) => {
    console.log(e.target.id);
    const payload = {
      "actionType":"COMPOSE",
      "user_1": '5dd1e01ca41f61bc78f2c6f1',
      "user_2": e.target.id,
      "sender": '5dd1e01ca41f61bc78f2c6f1',
      // "body": this.state.new_message
    };

    const data = {
      // userId: this.props.userId
      userId: '5dd1e01ca41f61bc78f2c6f1',
    };
    this.props.composeMessage(payload).then(() => {
      this.props.getMessageDetails(data).then(() => {
        this.props.showMessageModal();
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      suggestions: nextProps.searchSuggestions,
    });
  }
  render() {
    console.log(this.state.suggestions);

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
                  <div id={user._id} onClick= {e => this.composeMessage(e)}>
                    {/* <UserCard user={user} long></UserCard> */}
                    <div id={user._id} key={user._id}>
                      <div id={user._id}>
                        <div id={user._id} className="flexImageUser">
                          <div id={user._id}>
                            {/* Include user profile image if available */}
                            <img id={user._id} src={user.profilePic ? user.profilePic : '/images/default_profile_bigger.png'} className="userProfileImageCard" alt="user" />
                          </div>
                          <div>
                            <div id={user._id} className="flexNameHandleUserCard">
                              <p id={user._id} className="userCardUserName">{user.name}</p>
                              <p id={user._id} className="userCardUserHandle">@{user.handle}</p>
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


