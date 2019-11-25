import { GoMail } from 'react-icons/go';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import MessageCard from '../MessageCard/MessageCard';
import CreateMessageThread from '../MessageThread/CreateMessageThread';
import GetConversationThread from '../MessageThread/GetConversationThread';
import Sidebar from '../Sidebar/Sidebar';
import './Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        {/* <div className="messageThreadStyling">
          <CreateMessageThread />
        </div> */}
        <div className="messageThreadStyling">
          <GetConversationThread />
        </div>
      </div>
    );
  }
}

export default Messages;
