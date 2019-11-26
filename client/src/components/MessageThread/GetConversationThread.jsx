/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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
    // console.log('Get conversation: ', this.props.location.state.messages);
    // console.log('dnfjknf   ', this.props.location);
    const { activeConv } = this.props;
    const userId = '5dd2317e8f8a12706dfd7357';
    const messageThreadUser =
      activeConv.user_1._id === userId ? activeConv.user_2 : activeConv.user_1;
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
              console.log('Each message: ', eachMessage);
              console.log('Sender: ', eachMessage.sender);
              let myDate = new Date(eachMessage.createdAt);
              myDate = myDate.toString().split(' ');
              const timeValue = myDate[4].split(':');
              return (
                <div>
                  {eachMessage.sender === userId ? (
                    <div>
                      <div className="messageInfoLoggedInUser">
                        <div className="messageBoxLoggedInUser">
                          <div className="messageContent">{eachMessage.body}</div>
                        </div>
                      </div>
                      <div className="messageTimeStampLoggedInUser">
                        {myDate[0]}, {timeValue[0]}:{timeValue[1]}
                      </div>
                    </div>
                  ) : (
                    <div>
                    <div className="messageInfoSenderUser">
                      <div className="messageBoxSenderUser">
                        <div className="messageContent">{eachMessage.body}</div>
                      </div>
                    </div>
                    <div className="messageTimeStampSenderUser">
                        {myDate[0]}, {timeValue[0]}:{timeValue[1]}
                      </div>
                    </div>
                  )}
                </div>
              );
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
