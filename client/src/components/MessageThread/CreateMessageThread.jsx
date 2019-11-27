/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateMessageThread.css';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewMessageModal from './NewMessageModal';


class MessageThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessageModal: false
    };
    this.showMessageModal = this.showMessageModal.bind(this);
  }

  showMessageModal = () => {
    this.setState({ 
      showMessageModal: !this.state.showMessageModal
     });
  };

  render() {
    
    return (
      <div className="flexHomeScreen">
        <div className="cardContainerForMessages">
          <div className="firstNote">You don't have a message selected</div>
          <div className="secondNote">
            Choose one from your existing messages, or start a new one.
          </div>
          {/* <div className="messageAlignButton">
            <button className="messageBtn" type="button">
              New Message
            </button>
          </div> */}
          <div className="messageAlignButton">
          <button type="button" className="messageBtn" onClick={this.showMessageModal}>
            New Message
          </button>
        </div>
        
        {this.showMessageModal ? 
        <NewMessageModal 
          showMessageModal={this.showMessageModal}
          showMessageModalState={this.state.showMessageModal}
        />
        : null}
      </div>

      </div>
    );
  }
}

export default MessageThread;
