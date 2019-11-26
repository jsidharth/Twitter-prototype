/* eslint-disable no-underscore-dangle */
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
    // console.log('Get conversation: ', this.props.location.state.messages);
    // console.log('dnfjknf   ', this.props.location);
    const { activeConv } = this.props;
    const userId = '5dcb31841c9d440000b0d332';
    const messageThreadUser =
      activeConv.user_1._id === userId ? activeConv.user_2 : activeConv.user_1;
    console.log(activeConv);
    return (
      <div className="flexConversationScreen">
        <div className="cardWidth">
          <div className="conversationHeight">
            <div className="convoUserName">{messageThreadUser.name}</div>
            <div className="convoUserHandle">@{messageThreadUser.handle}</div>
          </div>
        </div>

        {activeConv.messages && activeConv.messages.length
          ? activeConv.messages.map(eachMessage => {
              return <div>{eachMessage.body}</div>;
            })
          : null}

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
