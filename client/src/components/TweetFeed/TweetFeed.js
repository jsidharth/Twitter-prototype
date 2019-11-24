import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tweetActions } from '../../js/actions/index';
import TweetCard from '../TweetCard/TweetCard';
import { Link } from 'react-router-dom';

class TweetFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const data = {
      // userId: this.props.userId
      userId: '5dcb31841c9d440000b0d332',
    };
    const { fetchFeed } = this.props;
    fetchFeed(data);
  }

  render() {
    let renderFeed = null;
    if (this.props.feed) {
        renderFeed = this.props.feed;
    }

    return (
        <TweetCard tweet={renderFeed}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    feed: state.tweet.feed,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchFeed: data => dispatch(tweetActions.fetchFeed(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TweetFeed);
