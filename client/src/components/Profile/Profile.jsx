/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import { TiLocationOutline } from 'react-icons/ti';
import { GoCalendar } from 'react-icons/go';
import { GiBalloons } from 'react-icons/gi';
import { Tabs, Tab } from 'react-bootstrap';
import TweetCard from '../TweetCard/TweetCard';
import Sidebar from '../Sidebar/Sidebar';
import SearchBar from '../Search/SearchBar';
import './Profile.css';
import { userActions, tweetActions } from '../../js/actions/index';
import EditProfileModal from './EditProfileModal';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfileModal: false,
    };

    this.likeTweet = this.likeTweet.bind(this);
    this.unlikeTweet = this.unlikeTweet.bind(this);
    this.deleteTweet = this.deleteTweet.bind(this);
    this.bookmarkTweet = this.bookmarkTweet.bind(this);
    this.showProfileModal = this.showProfileModal.bind(this);
  }

  componentDidMount() {
    const data = {
      userId: this.props.match.params.userId,
    };
    const { getUserProfile, getLikedTweets } = this.props;
    getUserProfile(data);
    getLikedTweets(data);
  }

  likeTweet = e => {
    // Pass the current logged in user to check if he has liked the specific tweets
    const likePayload = { tweetId: e.target.id, userId: this.props.userId };
    // Fetch the current feed based on the userId in the params
    const getFeedPayload = {
      userId: this.props.match.params.userId,
    }
    this.props.likeTweet(likePayload).then(() => {
      this.props.getUserProfile(getFeedPayload).then(() => {
        this.props.getLikedTweets(getFeedPayload);
      });
    });
  };

  unlikeTweet = e => {
    // Pass the current logged in user to check if he has liked the specific tweets
    let unlikePayload = { tweetId: e.target.id, userId: this.props.userId };
    // Fetch the current feed based on the userId in the params
    const getFeedPayload = {
      userId: this.props.match.params.userId,
    }
    this.props.unlikeTweet(unlikePayload).then(() => {
      this.props.getUserProfile(getFeedPayload).then(() => {
        this.props.getLikedTweets(getFeedPayload);
      });
    });
  };

  deleteTweet = e => {
    const data = {
      tweetId: e.target.id,
      userId: this.props.match.params.userId,
    };
    this.props.deleteTweet(data).then(() => {
      this.props.getUserProfile(data);
    });
  };

  bookmarkTweet = e => {
    let data = { tweetId: e.target.id, userId: this.props.userId };
    this.props.bookmarkTweet(data).then(() => {
      this.props.getUserProfile(data);
    });
  };

  showProfileModal = () => {
    this.setState({ 
      showProfileModal: !this.state.showProfileModal
     });
  };

  render() {
    const { profile, likedTweets } = this.props;

    let birthDate = new Date(profile.dob);
    birthDate = birthDate.toString();
    birthDate = birthDate.split(' ');
    console.log(profile.dob);

    let joinedDate = new Date(profile.createdAt);
    joinedDate = joinedDate.toString();
    joinedDate = joinedDate.split(' ');

    const numTweets = profile && profile.tweets ? profile.tweets.length : 0;

    let bookmarkedTweets = null;
    if (this.props.bookmarkedTweets) {
      bookmarkedTweets = this.props.bookmarkedTweets;
    }
    
    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardContainer">
          <div className="cardWidth">
            <div className="paperHeightForProfile">
              <Link to="/home">
                <div className="backIcon">
                  <MdKeyboardBackspace size={30} />
                </div>
              </Link>
              <div className="profileNumTweets">
                Profile
                <div className="numTweets">{numTweets} Tweets</div>
              </div>
            </div>
            <div className="cardContent">
              <img
                src={profile.profilePic || '/images/default_profile.png'}
                className="profileImage"
                alt="User profile"
              />
              <div className="flexEditBtn">
                <div>
                  <p className="userName">{profile.name}</p>
                  <p className="userHandle">@{profile.handle}</p>
                </div>
                <div>
                  <button type="button" className="editProfileBtn" onClick={this.showProfileModal}>
                    Edit Profile
                  </button>
                  {this.showProfileModal ? (
                    <EditProfileModal
                    showProfileModal={this.showProfileModal}
                      showProfileModalState={this.state.showProfileModal}
                    />
                  ) : null}
                </div>
              </div>
              <div className="personalDetails">
                <div className="flexIconDetails">
                  <div className="iconColor">
                    <TiLocationOutline size={20} />
                  </div>
                  <p className="tweetDate">{profile.location}</p>
                </div>
                <div className="flexIconDetails">
                  <div className="iconColor">
                    <GiBalloons size={20} />
                  </div>
                  <p className="tweetDate">
                    Born {birthDate[1]} {birthDate[2]}, {birthDate[3]}
                  </p>
                </div>
                <div className="flexIconDetails">
                  <div className="iconColor">
                    <GoCalendar size={20} />
                  </div>
                  <p className="tweetDate">
                    Joined {joinedDate[1]} {joinedDate[2]}, {joinedDate[3]}
                  </p>
                </div>
              </div>
              <Link to="/follow">
                <div className="followersFollowing">
                  <div className="follow">
                    <div className="countStyle">
                      {profile.following && profile.following.length ? profile.following.length : 0}
                    </div>
                    Following
                  </div>
                  <div className="follow">
                    <div className="countStyle">
                      {profile.followers && profile.followers.length ? profile.followers.length : 0}
                    </div>
                    Followers
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="tabMargin">
            <Tabs
              defaultActiveKey="tweets"
              transition={false}
              id="profile-tab"
              className="profileTabs"
            >
              {/* Change the API for correct data */}
              <Tab eventKey="tweets" title="Tweets">
                {profile.tweets && profile.tweets.length ? (
                  <div className="profileTweets">
                    <TweetCard
                      tweets={profile.tweets}
                      likeTweet={this.likeTweet}
                      unlikeTweet={this.unlikeTweet}
                      deleteTweet={this.deleteTweet}
                      bookmarkTweet={this.bookmarkTweet}
                      bookmarks={bookmarkedTweets}
                    />
                  </div>
                ) : null}
              </Tab>
              <Tab eventKey="tweets&replies" title="Tweets & replies">
                {profile.tweets && profile.tweets.length ? (
                  <div className="profileTweets">
                    <TweetCard
                      tweets={profile.tweets}
                      likeTweet={this.likeTweet}
                      unlikeTweet={this.unlikeTweet}
                      deleteTweet={this.deleteTweet}
                      bookmarkTweet={this.bookmarkTweet}
                      bookmarks={bookmarkedTweets}
                    />
                  </div>
                ) : null}
              </Tab>
              <Tab eventKey="retweets" title="Retweets">
                {profile.retweets && profile.retweets.length ? (
                  <div className="profileTweets">
                    <TweetCard
                      tweets={profile.retweets}
                      likeTweet={this.likeTweet}
                      unlikeTweet={this.unlikeTweet}
                      bookmarkTweet={this.bookmarkTweet}
                      bookmarks={bookmarkedTweets}
                    />
                  </div>
                ) : null}
              </Tab>
              <Tab eventKey="likes" title="Likes">
                {likedTweets && likedTweets.length ? (
                  <div className="profileTweets">
                    <TweetCard
                      tweets={likedTweets}
                      likeTweet={this.likeTweet}
                      unlikeTweet={this.unlikeTweet}
                      bookmarkTweet={this.bookmarkTweet}
                      bookmarks={bookmarkedTweets}
                    />
                  </div>
                ) : null}
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
  profile: state.user.profile,
  likedTweets: state.user.likedTweets,
  userId: state.user.currentUser._id,
  bookmarkedTweets: state.user.currentUser.bookmarks,

});

const mapDispatchToProps = dispatch => ({
  getUserProfile: data => dispatch(userActions.getUserProfile(data)),
  getLikedTweets: data => dispatch(userActions.getLikedTweets(data)),
  likeTweet: data => dispatch(tweetActions.likeTweet(data)),
  unlikeTweet: data => dispatch(tweetActions.unlikeTweet(data)),
  deleteTweet: data => dispatch(tweetActions.deleteTweet(data)),
  bookmarkTweet: data => dispatch(tweetActions.bookmarkTweet(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
