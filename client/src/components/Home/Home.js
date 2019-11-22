import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'js-cookie';
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
    let redirectVar = '';
    if (!cookie.get('token')) {
      redirectVar = <Redirect to="/" />;
    }
    return (
      <div>
        {redirectVar}
        <div className="flexHomeScreen">
          <div className="sideBarWidths">
            <Sidebar />
          </div>
          <div className="postTweetHeight">
            <PostTweet />
            <TweetCard />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
