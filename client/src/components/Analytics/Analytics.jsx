import React, { Component } from 'react';
import { Card, Paper } from '@material-ui/core';
import Sidebar from '../Sidebar/Sidebar';
import ProfileViews from './ProfileViews';
import NumberOfTweets from './NumberOfTweets'

class Analytics extends Component {
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
        <Card className="cardWidth">
          <Paper className="paperHeight">Analytics</Paper>
          <ProfileViews />
          <NumberOfTweets />
        </Card>
      </div>
    );
  }
}

export default Analytics;
