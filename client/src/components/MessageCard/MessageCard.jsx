/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MessageCard.css';
import { messageActions } from '../../js/actions/index';

class MessageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { userId, getMessageDetails } = this.props;
    const data = {
      userId,
    };
    getMessageDetails(data);
  }

  handleActiveMessage = e => {
    const { userId, setActiveMessage } = this.props;
    const payload = {
      userId,
      convId: e.target.id,
    };
    setActiveMessage(payload);
  };

  render() {
    const { conversations, userId } = this.props;
    const threads = conversations.map(convo => {
      const messageThreadUser = convo.user_1._id === userId ? convo.user_2 : convo.user_1;
      return (
        <div
          className="cardWidth-message"
          key={convo._id}
          id={convo._id}
          onClick={e => this.handleActiveMessage(e)}
        >
          <div className="cardContentHeight" id={convo._id}>
            <div className="flexImageTweet" id={convo._id}>
              <div id={convo._id}>
                <img
                  src={
                    messageThreadUser.profilePic
                      ? messageThreadUser.profilePic
                      : '/images/default_profile_reasonably_small.png'
                  }
                  className="profileImageMessage"
                  alt="user"
                />
              </div>
              <div className="flexNameHandle" id={convo._id}>
                <p className="messageUserName" id={convo._id}>
                  {messageThreadUser.name}
                </p>
                <p className="messageUserHandle" id={convo._id}>
                  @{messageThreadUser.handle}
                </p>
              </div>
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
    userId: state.user.currentUser._id,
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
