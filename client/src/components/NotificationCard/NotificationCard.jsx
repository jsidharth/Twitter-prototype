import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { Card, CardContent } from '@material-ui/core';
import './NotificationCard.css';

class NotificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const mockData = [
      {
        _id: '5dcb33ef1c9d440000b0d338',
        name: 'Savyasachi J',
        handle: 'savy',
        message: 'Hello',
        image: '',
        created_at: '2019-11-11T08:00:00.000Z',
      },
      {
        _id: '5dcb33ef1c9d440000b0d338',
        name: 'xyz',
        handle: 'xyz',
        message: 'Reply to message',
        image: '',
        created_at: '2019-11-13T08:00:00.000Z',
      },
    ];

    const feed = mockData.map(data => {
      let myDate = new Date(data.created_at);
      myDate = myDate.toString();
      myDate = myDate.split(' ');
      return (
        <Card className="cardWidth">
          <CardContent className="cardContent">
            <div className="flexImageTweet">
              <div className="flexNameHandle">
                <p className="messageUserName">{data.name}</p>
                <p className="messageUserHandle">@{data.handle}</p>
                <p className="messageUserName">.</p>
                <p className="messageDate">
                  {myDate[1]} {myDate[2]}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    });

    return <div>{feed}</div>;
  }
}

export default NotificationCard;
