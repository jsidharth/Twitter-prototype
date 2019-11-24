/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MessageThread.css';

class MessageThread extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flexHomeScreen">
        <div className="cardContainerForMessages">
          <div className="firstNote">You don't have a message selected</div>
          <div className="secondNote">
            Choose one from your existing messages, or start a new one.
          </div>
          <div className="messageAlignButton">
            <button className="messageBtn" type="button">
              New Message
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageThread;
