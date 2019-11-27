/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from './SearchBar';
import TweetCard from '../TweetCard/TweetCard';
import { searchActions, tweetActions, userActions } from '../../js/actions';
import UserCard from '../UserCard/UserCard';
import './SearchResults.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  likeTweet = e => {
    const { searchTerm } = this.props.location.state;
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.likeTweet(data).then(() => {
      this.props.getSearchResults(searchTerm);
    });
  };

  unlikeTweet = e => {
    const { searchTerm } = this.props.location.state;
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.unlikeTweet(data).then(() => {
        this.props.getSearchResults(searchTerm);
    });
  };
  render() {
    const { searchResults } = this.props;
    const activeTab = (searchResults.tweets && searchResults.tweets.length)? "tweets":"users";
    return (
      <div className="flexHomeScreen">
        <div className="sideBarWidths">
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeight">Search Results</div>
          <div className="tabMargin">
            <Tabs
              defaultActiveKey={activeTab}
              transition={false}
              id="profile-tab"
              className="profileTabs"
            >
              {/* Change the API for correct data */}
              <Tab eventKey="tweets" title="Tweets & Hashtags">
                <div className="resultsTab">
                  {searchResults.tweets && searchResults.tweets.length ? (
                    <div className="profileTweets">
                      <TweetCard
                        tweets={searchResults.tweets}
                        likeTweet={this.likeTweet}
                        unlikeTweet={this.unlikeTweet}
                      />
                    </div>
                  ) : null}
                </div>
              </Tab>
              <Tab eventKey="users" title="Users">
                <div className="resultsTab">
                  {searchResults.users && searchResults.users.length
                    ? searchResults.users.map(user => {
                        return (
                          <div>
                            <UserCard user={user} long></UserCard>
                          </div>
                        );
                      })
                    : null}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <SearchBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
  likedTweets: state.user.likedTweets,
  userId: state.user.currentUser._id
});

const mapDispatchToProps = dispatch => ({
  getSearchResults: data => dispatch(searchActions.getSearchResults(data)),
  getUserProfile: data => dispatch(userActions.getUserProfile(data)),
  getLikedTweets: data => dispatch(userActions.getLikedTweets(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchResults),
);
