/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import './Bookmarks.css';
import { tweetActions } from '../../js/actions/index';
import TweetCard from '../TweetCard/TweetCard';

class Bookmarks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const data = {
      // userId: this.props.userId
      userId: '5dcb32641c9d440000b0d334',
    };
    const { getBookmarks } = this.props;
    getBookmarks(data);
  }

  render() {
    let renderBookmarks = null;
    if (this.props.bookmarkedTweets) {
      renderBookmarks = this.props.bookmarkedTweets;
    }
    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Bookmarks</div>
          <TweetCard tweets={renderBookmarks} />
        </div>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bookmarks);
