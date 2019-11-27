/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from './SearchBar';
import TweetCard from '../TweetCard/TweetCard';
import { searchActions, tweetActions, userActions } from '../../js/actions';
import UserCard from '../UserCard/UserCard';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { userId: '5dcb31841c9d440000b0d332' };
  }

  likeTweet = e => {
    let data = { tweetId: e.target.id, userId: this.state.userId };
    this.props.likeTweet(data).then(() => {
      this.props.getUserProfile(data).then(() => {
        this.props.getLikedTweets(data);
      });
    });
  };

  unlikeTweet = e => {
    let data = { tweetId: e.target.id, userId: this.state.userId };
    this.props.unlikeTweet(data).then(() => {
      this.props.getUserProfile(data).then(() => {
        this.props.getLikedTweets(data);
      });
    });
  };
  render() {
    const { searchResults } = this.props;
    console.log('Here', searchResults);
    return (
      <div className="flexHomeScreen">
        <div className="sideBarWidths">
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Search Results</div>
          <div className="tabMargin">
            <Tabs
              defaultActiveKey="users"
              transition={false}
              id="profile-tab"
              className="profileTabs"
            >
              {/* Change the API for correct data */}
              <Tab eventKey="tweets" title="Tweets & Hashtags">
                {searchResults.tweets && searchResults.tweets.length ? (
                  <div className="profileTweets">
                    <TweetCard
                      tweets={searchResults.tweets}
                      likeTweet={this.likeTweet}
                      unlikeTweet={this.unlikeTweet}
                    />
                  </div>
                ) : null}
              </Tab>
              <Tab eventKey="users" title="Users">
                {searchResults.users && searchResults.users.length
                  ? searchResults.users.map(user => {
                      return (
                        <div>
                          <UserCard user={user}></UserCard>
                        </div>
                      );
                    })
                  : null}
              </Tab>
            </Tabs>
          </div>
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.search.searchResults,
    likedTweets: state.user.likedTweets,
  };
};

const mapDispatchToProps = dispatch => ({
  getSearchResults: data => dispatch(searchActions.getSearchResults(data)),
  getUserProfile: data => dispatch(userActions.getUserProfile(data)),
  getLikedTweets: data => dispatch(userActions.getLikedTweets(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
