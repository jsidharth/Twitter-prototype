/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { Card, CardContent } from '@material-ui/core';
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
      userId: '5dcb7bad13754dc1b536ccef',
    };

    const { getMessageDetails } = this.props;
    getMessageDetails(data);
  }

  render() {
    console.log(this.props.conversations);

    const { conversations } = this.props;

    const userId = '5dcb7bad13754dc1b536ccef';
    const threads = conversations.map(convo => {
      const messageThreadUser = convo.user_1._id === userId ? convo.user_2 : convo.user_1;
      console.log('Message thread user: ', messageThreadUser);

      // let myDate = new Date(data.created_at);
      // myDate = myDate.toString();
      // myDate = myDate.split(' ');
      return (
        <Card className="cardWidth-message" key={convo._id}>
          <CardContent className="cardContentHeight">
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
                {/* <p className="messageDate">
                  {myDate[1]} {myDate[2]}
                </p> */}
              </div>
            </div>

            {/* <p>{data.message}</p> */}
          </CardContent>
        </Card>
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
