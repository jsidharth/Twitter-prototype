/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Spinner } from 'react-bootstrap';
import { tweetActions } from '../../js/actions/index';
import TweetCard from '../TweetCard/TweetCard';
import './TweetFeed.css';

class TweetFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
      offset: 0,
      hasMore: true,
    };

    this.likeTweet = this.likeTweet.bind(this);
    this.unlikeTweet = this.unlikeTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.bookmarkTweet = this.bookmarkTweet.bind(this);
    this.retweet = this.retweet.bind(this);
    this.loadFunc = this.loadFunc.bind(this);
  }

  componentDidMount() {
    const fetchFeedPayload = {
      userId: this.props.userId,
      count: 10,
      offset: 0,
    };
    this.props.fetchUpdatedFeed(fetchFeedPayload);
  }

  likeTweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.likeTweet(data).then(() => {
      const fetchFeedPayload = {
        userId: this.props.userId,
        count: this.state.offset,
        offset: 0,
      };
      this.props.fetchUpdatedFeed(fetchFeedPayload);
    });
  };

  unlikeTweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.unlikeTweet(data).then(() => {
      const fetchFeedPayload = {
        userId: this.props.userId,
        count: this.state.offset,
        offset: 0,
      };
      this.props.fetchUpdatedFeed(fetchFeedPayload);
    });
  };

  bookmarkTweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.bookmarkTweet(data).then(() => {
      const fetchFeedPayload = {
        userId: this.props.userId,
        count: this.state.offset,
        offset: 0,
      };
      this.props.fetchUpdatedFeed(fetchFeedPayload);
    });
  };

  retweet = e => {
    const data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.retweet(data).then(() => {
      const fetchFeedPayload = {
        userId: this.props.userId,
        count: this.state.offset,
        offset: 0,
      };
      this.props.fetchUpdatedFeed(fetchFeedPayload);
    });
  };

  deleteTweet = e => {
    const data = {
      tweetId: e.target.id,
      userId: this.props.userId,
    };
    this.props.deleteTweet(data).then(() => {
      const fetchFeedPayload = {
        userId: this.props.userId,
        count: this.state.offset,
        offset: 0,
      };
      this.props.fetchUpdatedFeed(fetchFeedPayload);
    });
  };

  // Infinite scroll load function
  loadFunc = () => {
    const data = {
      userId: this.props.userId,
      count: this.state.count,
      offset: this.state.offset,
    };
    const { fetchFeed } = this.props;
    fetchFeed(data).then(size => {
      const newOffset = this.state.offset + this.state.count;
      if (size < newOffset) {
        this.setState({
          hasMore: false,
        });
      } else {
        this.setState({
          offset: newOffset,
        });
      }
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
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadFunc}
        hasMore={this.state.hasMore}
        loader={
          <div className="loaderIcon">
            <Spinner animation="border" variant="primary" />
          </div>
        }
      >
        <TweetCard
          tweets={renderFeed}
          likeTweet={this.likeTweet}
          unlikeTweet={this.unlikeTweet}
          deleteTweet={this.deleteTweet}
          bookmarkTweet={this.bookmarkTweet}
          retweet={this.retweet}
          bookmarks={renderBookmarks}
        />
      </InfiniteScroll>
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
  fetchUpdatedFeed: data => dispatch(tweetActions.fetchUpdatedFeed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetFeed);
