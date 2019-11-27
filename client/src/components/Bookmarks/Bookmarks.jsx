/* eslint-disable react/destructuring-assignment */
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
          // userId: this.props.userId
    this.state = { userId: '5dcb31841c9d440000b0d332' };
  }

  componentDidMount() {
    const data = {
      // userId: this.props.userId
      userId: '5dcb32641c9d440000b0d334',
    };
    const { getBookmarks } = this.props;
    getBookmarks(data);
  }
  likeTweet = e => {
    let data = { tweetId: e.target.id, userId: '5dcb31841c9d440000b0d332' };
    this.props.likeTweet(data).then(() => {
      data = {  userId: '5dcb32641c9d440000b0d334' };
      this.props.getBookmarks(data);
    });
  };

  unlikeTweet = e => {
    let data = { tweetId: e.target.id, userId: '5dcb31841c9d440000b0d332' };
    this.props.unlikeTweet(data).then(() => {
       data = {  userId: '5dcb32641c9d440000b0d334' };
      this.props.getBookmarks(data);
    });
  };
  render() {
    let renderBookmarks = null;
    if (this.props.bookmarkedTweets) {
      renderBookmarks = this.props.bookmarkedTweets;
    }
    return (
      <div className="flexHomeScreen">
        <div className="sideBarWidths">
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Bookmarks</div>
          <TweetCard
            tweets={renderBookmarks}
            likeTweet={this.likeTweet}
            unlikeTweet={this.unlikeTweet}
          />
        </div>
        <SearchBar />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    bookmarkedTweets: state.tweet.bookmarkedTweets,
  };
};

const mapDispatchToProps = dispatch => ({
  getBookmarks: data => dispatch(tweetActions.getBookmarks(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmarks);
