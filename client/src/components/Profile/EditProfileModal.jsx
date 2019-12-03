/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlinePicture } from 'react-icons/ai';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import './EditProfileModal.css';
import { connect } from 'react-redux';
import { imageActions, userActions } from '../../js/actions/index';

class EditProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bio: '',
      location: '',
      website: '',
      dob: '',
      profilePic: '',
      date: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.checkAgeAbove18 = this.checkAgeAbove18.bind(this);
    this.isNameValid = this.isNameValid.bind(this);
    this.isWebsiteValid = this.isWebsiteValid.bind(this);
    this.isAgeValid = this.isAgeValid.bind(this);
  }

  componentDidMount() {
    const { name, bio, location, website, dob, profilePic } = this.props.profile;
    this.setState({
      name,
      bio,
      location,
      website,
      profilePic,
      date: new Date(moment(dob).format('MM-DD-YYYY')),
    });
  }

  deactivate = () => {
    const payload = { userId: this.props.userId };
    this.props.deactivate(payload);
  };

  checkAgeAbove18 = () => {
    const dob = moment(this.state.date);
    const today = moment(new Date());
    const diffDuration = moment.duration(today.diff(dob));
    const ageInYears = diffDuration.years();
    if (ageInYears >= 18) {
      return true;
    }
    return false;
  };

  updateProfile = () => {
    const payload = {
      _id: this.props.userId,
      name: this.state.name,
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
      dob: this.state.date,
      profilePic: this.state.profilePic,
    };

    const nameValidity = this.isNameValid();
    const bioTrimming = this.trimBioSpaces();
    const ageValidity = this.isAgeValid();
    const websiteValidity = this.isWebsiteValid();
    const locationValidity = this.isLocationValid();
    if (
      this.state.name &&
      nameValidity &&
      ageValidity &&
      websiteValidity &&
      locationValidity &&
      bioTrimming
    ) {
      this.props.updateProfile(payload);
      this.props.showProfileModal();
    }
  };

  isNameValid = () => {
    if (/^[A-Za-z]+(?: +[A-Za-z]+)*$/.test(this.state.name)) {
      this.setState({ nameError: '' });
      return true;
    }
    this.setState({ nameError: 'Name can include only alphabets and non trailing spaces' });
    return false;
  };

  trimBioSpaces = () => {
    const len = this.state.bio.trim().length;
    if (len === 0) {
      this.setState({
        bio: '',
      });
    }
    return true;
  };

  isLocationValid = () => {
    if (this.state.location && /^[A-Za-z]+(?: +[A-Za-z]+)*$/.test(this.state.location)) {
      this.setState({ locationError: '' });
      return true;
    }
    if (!this.state.location) {
      return true;
    }
    this.setState({
      locationError: 'Location can include only alphabets and non trailing spaces',
    });
    return false;
  };

  isWebsiteValid = () => {
    if (
      this.state.website &&
      /^((https):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(this.state.website)
    ) {
      this.setState({ websiteError: '' });
      return true;
    }
    if (!this.state.website) {
      return true;
    }
    this.setState({ websiteError: 'Please enter valid URL format' });
    return false;
  };

  isAgeValid = () => {
    if (this.state.dob) {
      if (this.checkAgeAbove18()) {
        this.setState({ dateError: '' });
        return true;
      }
      this.setState({ dateError: 'You must be 18 years or above' });
      return false;
    }
    this.setState({ dateError: '' });
    return true;
  };

  dateChangeHandler = date => {
    this.setState({ date });
    if (date) {
      const month = date.getMonth() + 1;
      this.setState({ dob: `${month}/${date.getDate()}/${date.getFullYear()}` });
    } else {
      this.setState({ dateError: 'You must be 18 years or above' });
      return false;
    }
  };

  uploadImage = () => {
    const data = new FormData();
    if (this.uploadProfileImage.files && this.uploadProfileImage.files.length) {
      data.append('file', this.uploadProfileImage.files[0] || '');
      this.props.upload(data).then(() => {
        this.setState({
          profilePic: this.props.imageUrl,
        });
      });
    }
  };

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  closeModal = () => {
    const { name, bio, location, website, dob, profilePic } = this.props.profile;
    this.setState({
      name,
      bio,
      location,
      website,
      profilePic,
      date: new Date(moment(dob).format('MM-DD-YYYY')),
      nameError: '',
      dateError: '',
      locationError: '',
      websiteError: '',
    });
    this.props.showProfileModal();
  };

  render() {
    const imgSrc = this.props.user.profilePic
      ? this.props.user.profilePic
      : '/images/default_profile_bigger.png';
    return (
      <div>
        <Modal
          dialogClassName="profileModal"
          show={this.props.showProfileModalState}
          onHide={this.closeModal}
          centered
        >
          <Modal.Header closeButton>
            <button className="saveBtn" type="button" onClick={this.updateProfile}>
              Save
            </button>
            <Modal.Title className="modalTitle">Edit Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body className="editForm">
            <img
              src={this.state.profilePic ? this.state.profilePic : imgSrc}
              className="uploadProfileImage"
              alt="Profile"
            />
            <div className="flexUploadImage">
              <div className="flexIconCharsCount">
                <div className="iconUploadForProfile">
                  <input
                    className="inputStyle"
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={this.uploadImage}
                    ref={ref => {
                      this.uploadProfileImage = ref;
                    }}
                  />
                  <label htmlFor="icon-button-file">
                    <AiOutlinePicture color="#1da1f2" size={25} />
                  </label>
                </div>
              </div>
            </div>
            <form>
              <div className="flexLabelInput">
                <label className="inputTitle">Name</label>
                <input
                  className="inputDetails"
                  type="text"
                  name="name"
                  onChange={this.handleOnChange}
                  value={this.state.name}
                />
                <label className="error">{this.state.nameError}</label>
              </div>
              <div className="flexLabelInput">
                <label className="inputTitle">Bio</label>
                <input
                  className="inputDetails"
                  type="text"
                  name="bio"
                  onChange={this.handleOnChange}
                  value={this.state.bio}
                />
              </div>
              <div className="flexLabelInput">
                <label className="inputTitle">Location</label>
                <input
                  className="inputDetails"
                  type="text"
                  name="location"
                  onChange={this.handleOnChange}
                  value={this.state.location}
                />
                <label className="error">{this.state.locationError}</label>
              </div>
              <div className="flexLabelInput">
                <label className="inputTitle">Website</label>
                <input
                  className="inputDetails"
                  type="text"
                  name="website"
                  onChange={this.handleOnChange}
                  value={this.state.website}
                />
                <label className="error">{this.state.websiteError}</label>
              </div>
              <div className="flexLabelInput">
                <label className="inputTitle">Birth Date</label>
                <div className="dateStyling">
                  <DatePicker
                    className="dateDetails"
                    onChange={this.dateChangeHandler}
                    value={this.state.date}
                  />
                </div>
                <label className="error">{this.state.dateError}</label>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer className="deactivate" onClick={this.deactivate}>
            <div>
              <p>Deactivate</p>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.user.profile,
  userId: state.user.currentUser._id,
  imageUrl: state.image.imageUrl,
  user: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  upload: data => dispatch(imageActions.upload(data)),
  updateProfile: data => dispatch(userActions.updateProfile(data)),
  deactivate: data => dispatch(userActions.deactivate(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileModal);
