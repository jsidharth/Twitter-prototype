/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './NewProfileModal.css';

class NewProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        bio: '',
        location: '',
        website: '',
        dob: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOnChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit(event) {
    alert(this.state.username);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Modal
          dialogClassName="profileModal"
          show={this.props.showProfileModalState}
          onHide={this.props.showProfileModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body className="EditForm">
            <form>
            <img
                src={'/images/default_profile.png'}
                className="profileImage"
                alt="User profile"
              /><br/><br/>
                <label className="inputTitle">Name</label><br/>
                <input className="inputDetails" type="text" name="name" onChange={this.handleOnChange}/><br/><br/>
                <label className="inputTitle">Bio</label><br/>
                <input className="inputDetails" type="text" name="bio" onChange={this.handleOnChange} /><br/><br/>
                <label className="inputTitle">Location</label><br/>
                <input className="inputDetails" type="text" name="location" onChange={this.handleOnChange} /><br/><br/>
                <label className="inputTitle">Website</label><br/>
                <input className="inputDetails" type="text" name="website" onChange={this.handleOnChange} /><br/><br/>
                <label className="inputTitle">Birth Date</label><br/>
                <input className="inputDetails" type="text" name="dob" onChange={this.handleOnChange} /><br/><br/>
                <button className="submitBtn" type="button">
                Save
                </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default NewProfileModal;
