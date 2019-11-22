import React, { Component } from 'react';
import { Card, Paper } from '@material-ui/core';
import Sidebar from '../Sidebar/Sidebar';
import './Bookmarks.css'

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flexHomeScreen">
        <div className="sideBarWidths">
          <Sidebar />
        </div>
        <Card className="cardWidth">
          <Paper className="paperHeight">Bookmarks</Paper>
        </Card>
      </div>
    );
  }
}

export default Bookmarks;
