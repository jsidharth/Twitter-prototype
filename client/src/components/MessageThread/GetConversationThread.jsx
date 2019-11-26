/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { GoMail } from 'react-icons/go';
import { Link } from 'react-router-dom';
import './GetConversationThread.css';
import { MdSend } from 'react-icons/md';
import MessageCard from '../MessageCard/MessageCard';
import Sidebar from '../Sidebar/Sidebar';

class GetConversationThread extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('Get conversation: ', this.props.location.state.messages);
    console.log('dnfjknf   ', this.props.location);
    return (
      <div className="flexConversationScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth1">
          <div className="paperHeight">
            Messages
            <Link to="/home">
              <div className="messageIcon">
                <GoMail size={25} />
              </div>
            </Link>
          </div>
          <div className="messageCardStyling">
            <MessageCard />
          </div>
        </div>
        <div className="cardWidth">
          <div className="conversationHeight">
            <div className="convoUserName">Name</div>
            <div className="convoUserHandle">@Handle</div>
          </div>
        </div>
        

        <div className="conversationCardWidth">
          <div className="conversationHeight">
            <div className="autoExpandDiv1">
              <textarea className="textArea" placeholder="Start a new message" />
              <Link to="/home">
                <div className="sendIcon">
                  <MdSend size={25} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetConversationThread;
