/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import _ from 'lodash';
import './MessageCard.css';
import { messageActions } from '../../js/actions/index';

class MessageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const data = {
      // userId: this.props.userId
      userId: '5dd2317e8f8a12706dfd7357',
    };

    const { getMessageDetails } = this.props;
    getMessageDetails(data);
  }
  handleActiveMessage = (e) => {
   console.log('here', e.target.id);
    const activeMessage = _.find(this.props.conversations, conv => conv._id === e.target.id);
    this.props.setActiveMessage(activeMessage);
  }
  render() {
    console.log(this.props.conversations);

    const { conversations } = this.props;
    const conversationThread = [];
    const userId = '5dd2317e8f8a12706dfd7357';
    const threads = conversations.map(convo => {
      const messageThreadUser = convo.user_1._id === userId ? convo.user_2 : convo.user_1;
      console.log('Message thread user: ', messageThreadUser);
      console.log('Finding messages: ', convo.messages);
      return (
        <div className="cardWidth-message" key={convo._id} id={convo._id} onClick= {e => this.handleActiveMessage(e)}>
          <div className="cardContentHeight" id={convo._id}>
            <div className="flexImageTweet" id={convo._id}>
              <div id={convo._id}>
                {/* Include user profile image if available */}
                <Image
                  src="/images/default_profile_bigger.png"
                  roundedCircle
                  className="profileImage"
                  width="60%"
                />
              </div>
              <div className="flexNameHandle" id={convo._id}>
                <p className="messageUserName" id={convo._id}>{messageThreadUser.name}</p>
                <p className="messageUserHandle" id={convo._id}>@{messageThreadUser.handle}</p>
              </div>
              {/* {convo.messages && convo.messages.length
                ? convo.messages.forEach(eachMessage => {
                    console.log(' Here' ,eachMessage.body);
                    // conversationThread.push(eachMessage.body);
                  })
                : null} */}
              {/* {console.log('Conversation Thread: ', conversationThread)} */}
            </div>
          </div>
        </div>
      );
    });

    return <div>{threads}</div>;
  }
}

const mapStateToProps = state => {
  return {
    conversations: state.message.conversations,
  };
};

const mapDispatchToProps = dispatch => ({
  getMessageDetails: data => dispatch(messageActions.getMessageDetails(data)),
  setActiveMessage: data => dispatch(messageActions.setActiveMessage(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageCard);
