import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../Sidebar/Sidebar';
import ProfileViews from '../ProfileViews/ProfileViews';
import MostViewedTweets from '../MostViewedTweets/MostViewedTweets';
import NumberOfTweets from '../NumberOfTweets/NumberOfTweets';
import MostLikedTweets from '../MostLikedTweets/MostLikedTweets';
import MostRetweetedTweets from '../MostRetweetedTweets/MostRetweetedTweets';

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={7}>
          <Row>
            <MDBContainer className="paperHeight">Analytics</MDBContainer>
          </Row>
          <Row className="border">
            <ProfileViews />
            <MostViewedTweets />
            <NumberOfTweets />
            <MostLikedTweets />
            <MostRetweetedTweets />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Analytics;
