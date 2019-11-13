import React, { Component } from 'react';
import PostTweet from '../PostTweet/PostTweet';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <PostTweet />
      </div>
    );
  }
}

export default Home;
