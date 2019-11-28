/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-date-picker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Profile.css';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  show() {
    this.setState({
      showModal: true,
    });
  }

  hide() {
    this.setState({
      showModal: true,
    });
  }

  render() {
    return (
      <div>
        <Modal dialogClassName="updateModal" show={this.props.show} centered>
          <Modal.Header>
            <Col md={5} />
            <Col md={3} />
            <Col md={2} />
            <Col md={2}>
              <button type="submit" className="btn-info-solid-next" onClick={this.showStep2Modal}>
                <p className="next">Save</p>
              </button>
            </Col>
          </Modal.Header>
          <Modal.Body className="step1-modal-body">
            <Row className="createAccount">
              <Col md={10}>
                <h3 className="bolder">Create Your Account</h3>
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row>
                  <h6 className="">Name</h6>
                </Row>
                <Row>
                  <input type="text" />
                </Row>
                <label className="error" />
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row className="margin">
                  <h6 className="">Email</h6>
                </Row>
                <Row>
                  <input type="email" />
                </Row>
                <label className="error" />
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row className="margin">
                  <h6 className="">Password</h6>
                </Row>
                <Row>
                  <input type="password" />
                </Row>
                <label className="error" />
              </Col>
              <Col md={1} />
            </Row>
            <Row>
              <Col md={1} />
              <Col md={10}>
                <Row className="margin">
                  <h6 className="bolder">Date of Birth</h6>
                </Row>
                <Row>
                  <h6 className="form-label">
                    This should be the date of birth of the person creating this account, whether
                    its personal or business account. This won't be public unless you change your
                    profile settings.
                  </h6>
                </Row>
                <Row>
                  <DatePicker />
                </Row>
                <label className="error" />
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
