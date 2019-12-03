/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
// eslint-disable-next-line import/no-named-as-default
import PostTweet from '../PostTweet/PostTweet';
import './Home.css';
import TweetFeed from '../TweetFeed/TweetFeed';
import SearchBar from '../Search/SearchBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const redirectVar = '';
    return (
      <div>
        {redirectVar}
        <div className="flexHomeScreen">
          <div>
            <Sidebar />
          </div>
          <div className="postTweetHeight">
            <PostTweet />
            <TweetFeed />
          </div>
          <SearchBar />
        </div>
      </div>
    );
  }
}

export default Home;
