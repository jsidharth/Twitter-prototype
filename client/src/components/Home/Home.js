/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'js-cookie';
import Sidebar from '../Sidebar/Sidebar';
// eslint-disable-next-line import/no-named-as-default
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
   /* if (!cookie.get('token')) {
      redirectVar = <Redirect to="/" />;
    }*/
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
