/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../Search/SearchBar';
import TweetCard from '../TweetCard/TweetCard';
import { listActions, tweetActions } from '../../js/actions';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getListDetails } = this.props;
    getListDetails(this.props.match.params.listId);
  }

  render() {
    const { tweets, members, subscribers, listOwner } = this.props.currentList;

    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Lists</div>
          <div className="cardContent">
            <img
              src={listOwner.profilePic || '/images/default_profile.png'}
              className="profileImage"
              alt="User profile"
            />
            <div className="flexEditBtn">
              <div>
                <p className="userName">{listOwner.name}</p>
                <p className="userHandle">@{listOwner.handle}</p>
                <p>{members.length} Members</p>
                <p>{subscribers.length} Subscribers</p>
              </div>
              <TweetCard
                tweets={tweets}
                likeTweet={this.likeTweet}
                unlikeTweet={this.unlikeTweet}
                deleteTweet={this.deleteTweet}
                bookmarkTweet={this.bookmarkTweet}
              />
            </div>
          </div>
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentList: state.list.listDetails,
});

const mapDispatchToProps = dispatch => ({
  getListDetails: data => dispatch(listActions.getListDetails(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
  deleteTweet: data => dispatch(tweetActions.deleteTweet(data)),
  bookmarkTweet: data => dispatch(tweetActions.bookmarkTweet(data)),
  retweet: data => dispatch(tweetActions.retweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListView);
