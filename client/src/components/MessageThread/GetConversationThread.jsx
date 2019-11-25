import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GetConversationThread.css';
import { MdSend } from 'react-icons/md';

class GetConversationThread extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flexConversationScreen">
        <div className="cardWidth">
          <div className="conversationHeight">
            <div className="convoUserName">Name</div>
            <div className="convoUserHandle">@Handle</div>
          </div>
        </div>
        <div className="conversationCardWidth">
          <div className="conversationHeight">
            <p>Type Message here</p>
            <Link to="/home">
              <div className="sendIcon">
                <MdSend size={25} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GetConversationThread;
