/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tweetActions } from '../../js/actions/index';
import TweetCard from '../TweetCard/TweetCard';

class TweetFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {userId:'5dcb31841c9d440000b0d332'};
  }

  componentDidMount() {
    const data = {
      // userId: this.props.userId
      userId: '5dcb31841c9d440000b0d332',
    };
    const { fetchFeed } = this.props;
    fetchFeed(data);
  }
  likeTweet = param => (e) => {
    let data = { tweetId: param, userId: this.state.userId };
      this.props.likeTweet(data).then(()=>{
        this.props.fetchFeed(data);
      });
  }

  unlikeTweet = param => (e) => {
    let data = { tweetId: param, userId: this.state.userId }
      this.props.unlikeTweet(data).then(()=>{
        this.props.fetchFeed(data);
      });

  }
  render() {
    let renderFeed = null;
    if (this.props.feed) {
      renderFeed = this.props.feed;
    }

    return <TweetCard tweets={renderFeed} likeTweet={this.likeTweet} unlikeTweet={this.unlikeTweet} />;
  }
}

const mapStateToProps = state => {
  return {
    feed: state.tweet.feed,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFeed: data => dispatch(tweetActions.fetchFeed(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetFeed);
