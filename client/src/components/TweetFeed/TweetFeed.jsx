/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tweetActions } from '../../js/actions/index';
import TweetCard from '../TweetCard/TweetCard';

class TweetFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.likeTweet = this.likeTweet.bind(this);
    this.unlikeTweet = this.unlikeTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.bookmarkTweet = this.bookmarkTweet.bind(this);
    this.retweet = this.retweet.bind(this);
  }

  componentDidMount() {
    const data = {
      userId: this.props.userId,
    };
    const { fetchFeed } = this.props;
    fetchFeed(data);
  }

  likeTweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.likeTweet(data).then(() => {
      this.props.fetchFeed(data);
    });
  };

  unlikeTweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.unlikeTweet(data).then(() => {
      this.props.fetchFeed(data);
    });
  };

  bookmarkTweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.bookmarkTweet(data).then(() => {
      this.props.fetchFeed(data);
    });
  };

  retweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.retweet(data).then(() => {
      this.props.fetchFeed(data);
    });
  };

  deleteTweet = e => {
    const data = {
      tweetId: e.target.id,
      userId: this.props.userId,
    };
    this.props.deleteTweet(data).then(() => {
      this.props.fetchFeed(data);
    });
  };

  render() {
    let renderFeed = null;
    if (this.props.feed) {
      renderFeed = this.props.feed;
    }
    
    let renderBookmarks = null;
    if (this.props.bookmarkedTweets) {
      renderBookmarks = this.props.bookmarkedTweets;
    }

    return (
      <TweetCard
        tweets={renderFeed}
        likeTweet={this.likeTweet}
        unlikeTweet={this.unlikeTweet}
        deleteTweet={this.deleteTweet}
        bookmarkTweet={this.bookmarkTweet}
        retweet={this.retweet}
        bookmarks={renderBookmarks}
      />
    );
  }
}

const mapStateToProps = state => ({
  feed: state.tweet.feed,
  userId: state.user.currentUser._id,
  bookmarkedTweets: state.user.currentUser.bookmarks,
});

const mapDispatchToProps = dispatch => ({
  fetchFeed: data => dispatch(tweetActions.fetchFeed(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
  deleteTweet: data => dispatch(tweetActions.deleteTweet(data)),
  bookmarkTweet: data => dispatch(tweetActions.bookmarkTweet(data)),
  retweet: data => dispatch(tweetActions.retweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetFeed);
