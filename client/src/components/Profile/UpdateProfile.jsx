/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdClose } from 'react-icons/md';
import DatePicker from 'react-date-picker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: '',
      name: '',
      location: '',
      website: '',
      date: '',
    };
  }

  componentWillReceiveProps(newProps) {
    const { profile } = newProps;
    this.setState({
      bio: profile.bio,
      name: profile.name,
      location: profile.location,
      website: profile.website,
      date: profile.dob,
    });
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <Modal show={this.props.show} size="lg" centered>
          <Modal.Header className="modalHeader">
            <Col md={1} className="zeroPadding">
              <MdClose className="closeButton" onClick={this.props.hide} size={30} />
            </Col>
            <Col md={3} className="zeroPadding">
              <div className="editProfile">Edit Profile</div>
            </Col>
            <Col md={6} />
            <Col md={2}>
              <button type="submit" className="btn-info-solid-save" onClick={this.showStep2Modal}>
                <p className="save">Save</p>
              </button>
            </Col>
          </Modal.Header>
          <Modal.Body className="marginBottom">
            <Row className="createAccount">
              <Col md={4} />
              <Col md={4} style={{ textAlign: 'center' }}>
                <img
                  src={profile.profilePic || '/images/default_profile.png'}
                  className="profileImageForEdit"
                  alt="User profile"
                />
              </Col>
              <Col md={4} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row>
                  <h6 className="marginBottom">Name</h6>
                </Row>
                <Row>
                  <input
                    type="text"
                    className="editProfileText"
                    value={this.state.name}
                    onChange={this.nameChangeHandler}
                  />
                </Row>
                <label className="error">{this.state.nameError}</label>
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row className="">
                  <h6 className="marginBottom">Bio</h6>
                </Row>
                <Row>
                  <textarea
                    rows="3"
                    cols="50"
                    className="textareaEdit"
                    value={this.state.bio}
                    onChange={this.emailChangeHandler}
                  />
                </Row>
                <label className="error">{this.state.emailError}</label>
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row>
                  <h6 className="marginBottom">Location</h6>
                </Row>
                <Row>
                  <input
                    type="text"
                    className="editProfileText"
                    value={this.state.location}
                    onChange={this.nameChangeHandler}
                  />
                </Row>
                <label className="error">{this.state.nameError}</label>
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row>
                  <h6 className="marginBottom">Website</h6>
                </Row>
                <Row>
                  <input
                    type="text"
                    className="editProfileText"
                    value={this.state.website}
                    onChange={this.nameChangeHandler}
                  />
                </Row>
                <label className="error">{this.state.nameError}</label>
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row className="margin">
                  <h6 className="bolder">Date of Birth</h6>
                </Row>
                <Row className="datePickerMargin">
                  <DatePicker
                    className="datePickerMargin"
                    onChange={this.dateChangeHandler}
                    value={this.state.date}
                  />
                </Row>
                <label className="error">{this.state.dateError}</label>
              </Col>
              <Col md={1} />
            </Row>
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
)(UpdateProfile);
