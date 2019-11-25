/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
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
      userId: '5dcb31841c9d440000b0d332',
    };

    const { getMessageDetails } = this.props;
    getMessageDetails(data);
  }

  render() {
    console.log(this.props.conversations);

    const { conversations } = this.props;

    const userId = '5dcb31841c9d440000b0d332';
    // let conversationThread = [];
    const threads = conversations.map(convo => {
      const messageThreadUser = convo.user_1._id === userId ? convo.user_2 : convo.user_1;
      console.log('Message thread user: ', messageThreadUser);
      console.log('Finding messages: ', convo.messages);

      return (
        <div className="cardWidth-message" key={convo._id}>
          <div className="cardContentHeight">
            <div className="flexImageTweet">
              <div>
                {/* Include user profile image if available */}
                <Image
                  src="/images/default_profile_bigger.png"
                  roundedCircle
                  className="profileImage"
                  width="60%"
                />
              </div>
              <div className="flexNameHandle">
                <p className="messageUserName">{messageThreadUser.name}</p>
                <p className="messageUserHandle">@{messageThreadUser.handle}</p>
              </div>
              {convo.messages && convo.messages.length
                ? convo.messages.forEach(eachMessage => {
                    console.log(eachMessage.body);
                    // conversationThread.push(eachMessage.body);
                  })
                : null}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageCard);
