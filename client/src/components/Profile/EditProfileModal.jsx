/* eslint-disable react/no-unused-state */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './EditProfileModal.css';
import { connect } from 'react-redux';

class EditProfileModal extends Component {
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
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const data = {
      userId: this.props.userId,
    };
    const { name, bio, location, website, dob } = this.props.profile;
    this.setState({
      name,
      bio,
      location,
      website,
      dob
    });
  }

  handleOnChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
  };

  handleSave(event) {
    alert("This Save");
    event.preventDefault();
  }

  componentWillReceiveProps(newProps) {
    const { profile } = newProps;
    this.setState({
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      dob: profile.dob,
    });
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
            <button className="saveBtn" type="button" onClick={this.handleSave}>
                Save
              </button>
            <Modal.Title className="modalTitle">Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body className="EditForm">
            <form>
            <img
                src={'/images/default_profile.png'}
                className="profileImage"
                alt="User profile"
              /><br/><br/>
                <label className="inputTitle">Name</label><br/>
                <input className="inputDetails" type="text" name="name" onChange={this.handleOnChange} value={this.state.name}/><br/><br/>
                <label className="inputTitle">Bio</label><br/>
                <input className="inputDetails" type="text" name="bio" onChange={this.handleOnChange} value={this.state.bio}/><br/><br/>
                <label className="inputTitle">Location</label><br/>
                <input className="inputDetails" type="text" name="location" onChange={this.handleOnChange} value={this.state.location}/><br/><br/>
                <label className="inputTitle">Website</label><br/>
                <input className="inputDetails" type="text" name="website" onChange={this.handleOnChange} value={this.state.website}/><br/><br/>
                {/* <label className="inputTitle">Birth Date</label><br/>
                <input className="inputDetails" type="text" name="dob" onChange={this.handleOnChange} value={profile.dob}/><br/><br/> */}
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  userId: state.user.currentUser._id,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileModal);

