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
      showAddMembersModal: false
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.nextBtnHandler = this.nextBtnHandler.bind(this);
    this.showAddMembersModal = this.showAddMembersModal.bind(this);
    this.resetStatesAddListModal = this.resetStatesAddListModal.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  nextBtnHandler = () => {
    this.props.showAddListModal();
    this.showAddMembersModal();
  }

  showAddMembersModal = () => {
    this.setState({
      showAddMembersModal: !this.state.showAddMembersModal
    });
  };

  resetStatesAddListModal = () => {
    this.setState({
      listName: '',
      listDescription: ''
    })
  }

  render() {

    return (
      <div>
        <Modal
          dialogClassName="addListModal"
          show={this.props.showAddListModalState}
          onHide={this.props.showAddListModal}
          centered
        >
          <Modal.Header closeButton>
            <button className={!this.state.listName ? "disabledNextBtn" : "nextBtn"} onClick={this.nextBtnHandler} disabled={!this.state.listName}>Next</button>
            <Modal.Title className="newListTitle">Create new List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="inputAddListModal">
              <div className="flexLabelInputListModal">
                <label className="labelStyle">Name</label>
                <input name="listName" type="text" className="inputAddListModal" onChange={this.inputChangeHandler} required/>
              </div>
              <div className="flexLabelInputListModal">
                <label className="labelStyle">Description</label>
                <input name="listDescription" type="text" className="inputAddListModal" onChange={this.inputChangeHandler} required/>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        {this.showAddMembersModal ? 
        <AddMembersModal 
        showAddMembersModal={this.showAddMembersModal}
        showAddMembersModalState={this.state.showAddMembersModal}
        listName={this.state.listName}
        listDescription={this.state.listDescription}
        resetStatesAddListModal={this.resetStatesAddListModal}
        /> 
        : null}
      </div>
    );
  }
}

export default AddListModal;
