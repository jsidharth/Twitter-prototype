import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../Sidebar/Sidebar';
import ProfileViews from './ProfileViews';
import MostViewedTweets from './MostViewedTweets';
import NumberOfTweets from './NumberOfTweets';
import MostLikedTweets from './MostLikedTweets';
import MostRetweetedTweets from './MostRetweetedTweets';
import './Analytics.css';

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
