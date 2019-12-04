/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import AddMembersModal from './AddMembersModal';
import './AddListModal.css';

class AddListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listName: '',
      listDescription: '',
      showAddMembersModal: false,
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.nextBtnHandler = this.nextBtnHandler.bind(this);
    this.showAddMembersModal = this.showAddMembersModal.bind(this);
    this.resetStatesAddListModal = this.resetStatesAddListModal.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value.trim(),
    });
  };

  nextBtnHandler = () => {
    const { showAddListModal } = this.props;
    showAddListModal();
    this.showAddMembersModal();
  };

  showAddMembersModal = () => {
    const { showAddMembersModal } = this.state;
    this.setState({
      showAddMembersModal: !showAddMembersModal,
    });
  };

  resetStatesAddListModal = () => {
    this.setState({
      listName: '',
      listDescription: '',
    });
  };

  render() {
    const { showAddListModal, showAddListModalState } = this.props;
    const { listName, listDescription, showAddMembersModal } = this.state;
    return (
      <div>
        <Modal
          dialogClassName="addListModal"
          show={showAddListModalState}
          onHide={showAddListModal}
          centered
        >
          <Modal.Header closeButton>
            <button
              className={!listName || listName.trim().length === 0 ? 'disabledNextBtn' : 'nextBtn'}
              onClick={this.nextBtnHandler}
              disabled={!listName || listName.trim().length === 0}
              type="button"
            >
              Next
            </button>
            <Modal.Title className="newListTitle">Create new List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="inputAddListModal">
              <div className="flexLabelInputListModal">
                <label className="labelStyle">Name</label>
                <input
                  name="listName"
                  type="text"
                  className="inputAddListModal"
                  onChange={this.inputChangeHandler}
                  required
                />
              </div>
              <div className="flexLabelInputListModal">
                <label className="labelStyle">Description</label>
                <input
                  name="listDescription"
                  type="text"
                  className="inputAddListModal"
                  onChange={this.inputChangeHandler}
                  required
                />
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {this.showAddMembersModal ? (
          <AddMembersModal
            showAddMembersModal={this.showAddMembersModal}
            showAddMembersModalState={showAddMembersModal}
            listName={listName}
            listDescription={listDescription}
            resetStatesAddListModal={this.resetStatesAddListModal}
          />
        ) : null}
      </div>
    );
  }
}

export default AddListModal;
