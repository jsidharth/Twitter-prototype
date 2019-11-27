/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { GoMail } from 'react-icons/go';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import MessageCard from '../MessageCard/MessageCard';
import CreateMessageThread from '../MessageThread/CreateMessageThread';
import GetConversationThread from '../MessageThread/GetConversationThread';
import Sidebar from '../Sidebar/Sidebar';
import './Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMessage: {},
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const activeMessage = nextProps.activeMessage || null;
    this.setState({
      activeMessage,
    });
  }

  render() {
    return (
      <div className="flexHomeScreen">
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
        {_.isEmpty(this.state.activeMessage) ? (
          <div className="messageThreadStyling">
            <CreateMessageThread />
          </div>
        ) : (
          <div className="messageThreadStyling">
            <GetConversationThread />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    conversations: state.message.conversations,
    activeMessage: state.message.activeMessage,
  };
};

export default connect(mapStateToProps)(Messages);
