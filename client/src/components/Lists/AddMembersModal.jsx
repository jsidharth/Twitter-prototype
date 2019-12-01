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
      search: '',
      suggestions: {},
      listOfMembers: [],
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.addMembersToList = this.addMembersToList.bind(this);
    this.doneBtnHandler = this.doneBtnHandler.bind(this);
    this.closeButtonHandler = this.closeButtonHandler.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleOnInputChange = event => {
    this.setState({ search: event.target.value });
    const userHandle = event.target.value;
    if (userHandle[0] === '@' && userHandle.length > 1) {
      this.props.getSearchMembersForList(userHandle);
    } else {
      this.setState({
        suggestions: {},
      });
    }
  };

  addMembersToList = (user) => {
    this.setState({
      listOfMembers: this.state.listOfMembers.concat(user)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      suggestions: nextProps.searchMembersForList,
    });
  }

  doneBtnHandler = () => {
    const data = {
      name: this.props.listName,
      description: this.props.listDescription,
      members: this.state.listOfMembers,
      userId: this.props.userId
    }
    this.props.createList(data).then(() => {
      this.props.showAddMembersModal();
      const { getLists } = this.props;
      getLists(this.props.userId);
      this.props.resetStatesAddListModal();
    })
  }

  closeButtonHandler = () => {
    this.props.showAddMembersModal();
    this.props.resetStatesAddListModal();
  }

  render() {
    return (
      <Modal
        dialogClassName="addListModal"
        show={this.props.showAddMembersModalState}
        onHide={this.closeButtonHandler}
        centered
      >
        <Modal.Header closeButton>
          <button className="doneBtn" onClick={this.doneBtnHandler}>Done</button>
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
          {this.state.listOfMembers ?
            <div className="flexMembersSelected">
              {this.state.listOfMembers.map(member => {
                return (
                  <div className="memberSelected">
                    <img src={member.profilePic ? member.profilePic : '/images/default_profile_bigger.png'} className="memberSelectedImage" />
                    <div className="memberSelectedName">{member.name}</div>
                  </div>
                )
              })}
            </div>
            :
            null}
          <div className="searchSuggestion">
            {this.state.suggestions && this.state.suggestions.length
              ? this.state.suggestions.map(user => {
                return (
                  <div id={user._id} value={user} onClick={() => this.addMembersToList(user)}>
                    <div id={user._id} key={user._id}>
                      <div id={user._id}>
                        <div id={user._id} className="flexImageUser">
                          <div id={user._id}>
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
