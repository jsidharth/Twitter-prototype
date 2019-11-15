import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PostTweet from '../PostTweet/PostTweet';
import './Home.css';

class Home extends Component {
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
        <div className="postTweetHeight">
          <PostTweet />
        </div>
      </div>
    );
  }
}

export default Home;
