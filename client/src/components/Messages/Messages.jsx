/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Card, CardContent, Paper } from '@material-ui/core';
import { GoMail } from 'react-icons/go';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import MessageCard from '../MessageCard/MessageCard';
import './Messages.css';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStep1: false,
      messageThread: {
        _id: '',
        followerMessages: [],
        followingMessages: [],
      },
      messageBody: '',
    };
    this.showStep1Modal = this.showStep1Modal.bind(this);
  }

  showStep1Modal = () => {
    this.setState({  });
  };

  render() {
    return (
      <div className="flexHomeScreen">
        <div className="sideBarWidths">
          <Sidebar />
        </div>
        <Card className="cardWidth">
          <Paper className="paperHeight">
            <div className="flexMessagesIcon">
              Messages
              {/* <Link to="/home"> */}
              {/* Change it to /messages/compose */}
              <div className="MessageIcon">
                <GoMail size={25} onClick={this.showStep1Modal} />
              </div>
              {/* </Link> */}
            </div>
          </Paper>
          <CardContent className="cardContent">
            <MessageCard />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Messages;
