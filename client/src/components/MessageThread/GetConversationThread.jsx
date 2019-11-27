/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './GetConversationThread.css';
import { MdSend } from 'react-icons/md';
import { messageActions } from '../../js/actions/index';

class GetConversationThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_message: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleActiveMessage = (e) => {
     const payload = {
       userId: this.props.userId,
       convId: e.target.id
     };
     this.props.setActiveMessage(payload);
   }
   handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
   }

   sendMessage = (e) => {
    const payload = {
      "user_1": this.props.activeConv.user_1._id,
      "user_2": this.props.activeConv.user_2._id,
      "sender": this.props.userId,
      "body": this.state.new_message
    };
    this.props.sendMessage(payload)
   }

  render() {
    const { activeConv } = this.props;
    const userId = '5dd1e01ca41f61bc78f2c6f1';
    const messageThreadUser =
      activeConv.user_1._id === userId ? activeConv.user_2 : activeConv.user_1;
    return (
      <div>
      <div className="flexConversationScreen">
        <div className="cardWidth">
          <div className="conversationHeight">
            <div className="convoUserName">{messageThreadUser.name}</div>
            <div className="convoUserHandle">@{messageThreadUser.handle}</div>
          </div>
        </div>
        <div className="messageThreadBody">
        {activeConv.messages && activeConv.messages.length
          ? activeConv.messages.map(eachMessage => {
              let myDate = new Date(eachMessage.createdAt);
              myDate = myDate.toString().split(' ');
              const timeValue = myDate[4].split(':');
              return (
                <div>
                  {eachMessage.sender === userId ? (
                     
                    <div>
                      {!eachMessage.body ? null :
                      <div>
                      <div className="messageInfoLoggedInUser">
                        <div className="messageBoxLoggedInUser">
                          <div className="messageContent">{eachMessage.body}</div>
                        </div>
                      </div>
                      <div className="messageTimeStampLoggedInUser">
                        {myDate[0]}, {timeValue[0]}:{timeValue[1]}
                      </div></div>}
                    </div>
                  ) : (
                    
                    <div>
                      <div className="messageInfoSenderUser">
                        <div className="messageBoxSenderUser">
                          <div className="messageContent">{!eachMessage.body ? null : eachMessage.body}</div>
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
          </div>
        </div>
        <div className="conversationCardWidth">
          <div className="conversationHeight">
            <div className="autoExpandDiv1">
              <textarea className="textArea1" placeholder="Start a new message" id = "new_message"onChange={this.handleChange}/>
              <div className="sendIcon" onClick={e => this.sendMessage(e)}>
                <MdSend size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  activeConv: state.message.activeMessage,
  userId: '5dd1e01ca41f61bc78f2c6f1',
});

const mapDispatchToProps = dispatch => ({
  sendMessage: data => dispatch(messageActions.sendMessage(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(GetConversationThread);
