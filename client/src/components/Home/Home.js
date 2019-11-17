/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import PostTweet from '../PostTweet/PostTweet';
import './Home.css';
import TweetCard from '../TweetCard/TweetCard';

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
          <TweetCard />
        </div>
      </div>
    );
  }
}

export default Home;
