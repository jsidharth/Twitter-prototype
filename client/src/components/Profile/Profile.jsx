import React, { Component } from 'react';
import { Card, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import Sidebar from '../Sidebar/Sidebar';

class Profile extends Component {
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
        {/* <Card className="cardWidth">
          <Paper className="paperHeight">Profile</Paper>
        </Card> */}
        <div className="cardContainer">
          <div className="cardWidth">
            <div className="paperHeight">
              <Link to="/home">
                <div className="backIcon">
                  <MdKeyboardBackspace size={30} />
                </div>
              </Link>
              Profile
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
