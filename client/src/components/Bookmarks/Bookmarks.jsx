/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import './Bookmarks.css';
import { tweetActions } from '../../js/actions/index';
import TweetCard from '../TweetCard/TweetCard';
import SearchBar from '../Search/SearchBar';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.likeTweet = this.likeTweet.bind(this);
    this.unlikeTweet = this.unlikeTweet.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    const data = {
      userId,
    };
    const { getBookmarks } = this.props;
    getBookmarks(data);
  }

  likeTweet = e => {
    const { userId, likeTweet, getBookmarks } = this.props;
    let data = { tweetId: e.target.id, userId };
    likeTweet(data).then(() => {
      data = { userId };
      getBookmarks(data);
    });
  };

  unlikeTweet = e => {
    const { userId, unlikeTweet, getBookmarks } = this.props;
    let data = { tweetId: e.target.id, userId };
    unlikeTweet(data).then(() => {
      data = { userId };
      getBookmarks(data);
    });
  };

  render() {
    let renderBookmarks = null;
    let bookmarkedTweets = null;
    const { tweets } = this.props;
    if (this.props.bookmarkedTweets) {
      // Contains all the id of bookmarked tweets
      renderBookmarks = this.props.bookmarkedTweets;
      // Contains all the tweets with details which are bookmarked by the user
      bookmarkedTweets = tweets;
    }
    return (
      <div className="flexHomeScreen">
        <div className="sideBarWidths">
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Bookmarks</div>
          <TweetCard
            tweets={bookmarkedTweets}
            likeTweet={this.likeTweet}
            unlikeTweet={this.unlikeTweet}
            bookmarks={renderBookmarks}
          />
        </div>
        <SearchBar />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  bookmarkedTweets: state.user.currentUser.bookmarks,
  tweets: state.tweet.bookmarkedTweets,
  userId: state.user.currentUser._id,
});

const mapDispatchToProps = dispatch => ({
  getBookmarks: data => dispatch(tweetActions.getBookmarks(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmarks);
