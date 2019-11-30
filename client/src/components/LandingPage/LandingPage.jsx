/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './LandingPage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import cookie from 'js-cookie';
import { userActions } from '../../js/actions';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStep1: false,
      showStep2: false,
      dateOfBirth: '',
      name: '',
      email: '',
      date: '',
      password: '',
      nameError: '',
      emailError: '',
      dateError: '',
      passwordError: '',
      loginUserName: '',
      loginPassword: '',
      loginUserNameError: '',
      loginPasswordError: '',
    };
    this.showStep1Modal = this.showStep1Modal.bind(this);
    this.hideStep1Modal = this.hideStep1Modal.bind(this);
    this.showStep2Modal = this.showStep2Modal.bind(this);
    this.hideStep2Modal = this.hideStep2Modal.bind(this);
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
  }

  dateChangeHandler = date => {
    this.setState({ date });
    if (date) {
      const month = date.getMonth() + 1;
      this.setState({ dateOfBirth: `${month}/${date.getDate()}/${date.getFullYear()}` });
    } else {
      this.setState({ dateOfBirth: '' });
    }
  };

  nameChangeHandler = e => {
    this.setState({ name: e.target.value });
  };

  emailChangeHandler = e => {
    this.setState({ email: e.target.value });
  };

  passwordChangeHandler = e => {
    this.setState({ password: e.target.value });
  };

  loginUserNameChangeHandler = e => {
    this.setState({ loginUserName: e.target.value });
  };

  loginPasswordChangeHandler = e => {
    this.setState({ loginPassword: e.target.value });
  };

  showStep1Modal = () => {
    this.setState({ showStep1: true, showStep2: false });
  };

  hideStep1Modal = () => {
    this.setState({ showStep1: false });
  };

  isPasswordValid = () => {
    if (this.state.password.length >= 6) {
      this.setState({ passwordError: '' });
      return true;
    }
    this.setState({ passwordError: '6 Characters minimum' });
    return false;
  };

  isNameValid = () => {
    if (/^[a-zA-Z ]+$/.test(this.state.name)) {
      this.setState({ nameError: '' });
      return true;
    }
    this.setState({ nameError: 'Name needs to be all alphabets' });
    return false;
  };

  isEmailValid = () => {
    if (/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({ emailError: '' });
      return true;
    }
    this.setState({ emailError: 'Email format invalid' });
    return false;
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

  isAgeValid = () => {
    if (this.state.dateOfBirth) {
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

  showStep2Modal = () => {
    const nameValidity = this.isNameValid();
    const emailValidity = this.isEmailValid();
    const ageValidity = this.isAgeValid();
    const passwordValidity = this.isPasswordValid();
    if (
      this.state.name &&
      this.state.email &&
      this.state.dateOfBirth &&
      nameValidity &&
      emailValidity &&
      ageValidity &&
      passwordValidity
    ) {
      this.setState({ showStep2: true, showStep1: false });
    }
  };

  hideStep2Modal = () => {
    this.setState({ showStep2: false });
  };

  checkFieldsEmpty = () => {
    let isLoginName = true;
    let isPassword = true;
    if (!this.state.loginUserName.length) {
      isLoginName = false;
      this.setState({ loginUserNameError: 'This is a required field' });
    } else if (!/\S+@\S+\.\S+/.test(this.state.loginUserName)) {
      isLoginName = false;
      this.setState({ loginUserNameError: 'Wrong format of Email' });
    } else {
      isLoginName = true;
      this.setState({ loginUserNameError: '' });
    }
    if (!this.state.loginPassword.length) {
      isPassword = false;
      this.setState({ loginPasswordError: 'This is a required field' });
    } else {
      isPassword = true;
      this.setState({ loginPasswordError: '' });
    }
    return isLoginName && isPassword;
  };

  login = () => {
    const userDetails = {
      email: this.state.loginUserName,
      password: this.state.loginPassword,
    };
    const checkFieldsEmpty = this.checkFieldsEmpty();
    if (checkFieldsEmpty) {
      this.props.login(userDetails);
    }
  };

  register = () => {
    const userDetails = {
      email: this.state.email,
      name: this.state.name,
      dob: this.state.dateOfBirth,
      password: this.state.password,
    };
    this.props.register(userDetails);
  };

  render() {
    let redirectVar = '';
    if (cookie.get('token')) {
      redirectVar = <Redirect to="/home" />;
    }
    return (
      <div>
        {redirectVar}
        <Row className="main1">
          <Col xs={6} className="home" />
          <Col xs={6} className="">
            <Row>
              <Col md={4}>
                <Row>
                  <h6 className="login-label">Email</h6>
                </Row>
                <Row>
                  <input
                    className="login-username"
                    type="text"
                    value={this.state.loginUserName}
                    onChange={this.loginUserNameChangeHandler}
                  />
                </Row>
                <label className="loginUserNameError">{this.state.loginUserNameError}</label>
              </Col>
              <Col md={4}>
                <Row>
                  <h6 className="login-label">Password</h6>
                </Row>
                <Row>
                  <input
                    className="login-username"
                    type="password"
                    value={this.state.loginPassword}
                    onChange={this.loginPasswordChangeHandler}
                  />
                </Row>
                <label className="loginUserNameError">{this.state.loginPasswordError}</label>
              </Col>
              <Col md={2}>
                <button type="button" className=" info-transparent-login" onClick={this.login}>
                  Log In
                </button>
              </Col>
            </Row>
            <Row className="twitterImage">
              <Col md={3} />
              <Col md={6}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/944px-Twitter_Bird.svg.png"
                  width="40px"
                  height="40px"
                  alt="Main logo link to home"
                />{' '}
              </Col>
              <Col md={3} />
            </Row>
            <Row className="">
              <Col md={3} />
              <Col md={6}>
                <h2 className="bolder">See what's happening in the world right now.</h2>
              </Col>
              <Col md={3} />
            </Row>
            <Row className="joinTwitter">
              <Col md={3} />
              <Col md={6}>
                <h4 className="bolder">Join Twitter today.</h4>
              </Col>
              <Col md={3} />
            </Row>
            <Row className="">
              <Col md={3} />
              <Col md={6}>
                <button type="button" className=" btn-info-solid" onClick={this.showStep1Modal}>
                  Sign Up
                </button>
              </Col>
              <Col md={3} />
            </Row>
            <Row>
              <Col md={3} />
              <Col md={6}>
                <button type="button" className=" btn-info-transparent">
                  Log In
                </button>
              </Col>
              <Col md={3} />
            </Row>
          </Col>

          <>
            <Modal
              dialogClassName="registerModal"
              show={this.state.showStep1}
              onHide={this.hideStep1Modal}
              centered
            >
              <Modal.Header className="registerModalHeader">
                <Col md={5} />
                <Col md={3}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Twitter_Bird.svg/944px-Twitter_Bird.svg.png"
                    width="25px"
                    height="25px"
                    alt="Main logo link to home"
                  />
                </Col>
                <Col md={2} />
                <Col md={2}>
                  <button
                    type="submit"
                    className="btn-info-solid-next"
                    onClick={this.showStep2Modal}
                  >
                    <p className="next">Next</p>
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
                      <input
                        type="text"
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
                    <Row className="margin">
                      <h6 className="">Email</h6>
                    </Row>
                    <Row>
                      <input
                        type="email"
                        value={this.state.email}
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
                    <Row className="margin">
                      <h6 className="">Password</h6>
                    </Row>
                    <Row>
                      <input
                        type="password"
                        value={this.state.password}
                        onChange={this.passwordChangeHandler}
                      />
                    </Row>
                    <label className="error">{this.state.passwordError}</label>
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
                        This should be the date of birth of the person creating this account,
                        whether its personal or business account. This won't be public unless you
                        change your profile settings.
                      </h6>
                    </Row>
                    <Row>
                      <DatePicker
                        onChange={this.dateChangeHandler}
                        value={this.state.date}
                        format="M/d/y"
                      />
                    </Row>
                    <label className="error">{this.state.dateError}</label>
                  </Col>
                  <Col md={1} />
                </Row>
              </Modal.Body>
            </Modal>
            <Modal
              dialogClassName="registerModal"
              show={this.state.showStep2}
              onHide={this.hideStep2Modal}
              centered
            >
              <Modal.Header>
                <Col md={2}>
                  <button
                    type="button"
                    className="btn-info-solid-next"
                    onClick={this.showStep1Modal}
                  >
                    <p className="next">Back</p>
                  </button>
                </Col>
                <Col md={2} />
                <Col md={4}>
                  <h4 className="bolder">Step 2 of 2</h4>
                </Col>
                <Col md={4} />
              </Modal.Header>
              <Modal.Body className="step2-modal-body">
                <Row className="marginTop20">
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
                      <input
                        type="text"
                        value={this.state.name}
                        readOnly
                        onClick={this.showStep1Modal}
                      />
                    </Row>
                  </Col>
                  <Col md={1} />
                </Row>
                <Row className="marginTop2">
                  <Col md={1} />
                  <Col md={10}>
                    <Row>
                      <h6 className="">Email</h6>
                    </Row>
                    <Row>
                      <input
                        type="text"
                        value={this.state.email}
                        readOnly
                        onClick={this.showStep1Modal}
                      />
                    </Row>
                  </Col>
                  <Col md={1} />
                </Row>
                <Row>
                  <Col md={1} />
                  <Col md={10}>
                    <Row className="marginTop2">
                      <h6 className="">Password</h6>
                    </Row>
                    <Row>
                      <input
                        type="password"
                        value={this.state.password}
                        onChange={this.passwordChangeHandler}
                        readOnly
                      />
                    </Row>
                  </Col>
                  <Col md={1} />
                </Row>
                <Row>
                  <Col md={1} />
                  <Col md={10}>
                    <Row className="marginTop2">
                      <h6 className="">Date of Birth</h6>
                    </Row>
                    <Row>
                      <input
                        type="text"
                        readOnly
                        value={this.state.dateOfBirth}
                        onClick={this.showStep1Modal}
                      />
                    </Row>
                  </Col>
                  <Col md={1} />
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Row>
                  <Row>
                    <Col md={2} />
                    <Col md={8} className="marginLeft">
                      <h6 className="form-label">
                        By signing up, you agree to the
                        <p className="colorP"> Terms of Service</p> and
                        <p className="colorP"> Privacy Policy</p>, including
                        <p className="colorP"> Cookie Use</p>. Others will be able to find you by
                        email when provided.
                      </h6>
                    </Col>
                    <Col md={2} />
                  </Row>
                  <Row>
                    <Col md={7} />
                    <Col md={5} className="signupMargin">
                      <button
                        type="button"
                        className="btn-info-solid-signup"
                        onClick={this.register}
                      >
                        Sign Up
                      </button>
                    </Col>
                  </Row>
                </Row>
              </Modal.Footer>
            </Modal>
          </>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userDetails: state.user.userDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(userActions.register(data)),
  login: data => dispatch(userActions.login(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LandingPage);
