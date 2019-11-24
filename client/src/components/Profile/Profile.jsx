import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import { TiLocationOutline } from 'react-icons/ti';
import { GoCalendar } from 'react-icons/go';
import { GiBalloons } from 'react-icons/gi';
import Sidebar from '../Sidebar/Sidebar';
import './Profile.css';
import { userActions } from '../../js/actions/index';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const data = {
      // userId: this.props.userId
      userId: '5dcb31841c9d440000b0d332',
    };
    const { getUserProfile } = this.props;
    getUserProfile(data);
  }

  render() {
    const { profile } = this.props;

    let birthDate = new Date(profile.dob);
    birthDate = birthDate.toString();
    birthDate = birthDate.split(' ');

    let joinedDate = new Date(profile.createdAt);
    joinedDate = joinedDate.toString();
    joinedDate = joinedDate.split(' ');

    let numTweets = 0
    if (profile && profile.tweets) {
      numTweets = profile.tweets.length;
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
                <div className="numTweets">
                {numTweets} Tweets
                </div>
              </div>
            </div>
            <div className="cardContent">
              <img src="/images/default_profile.png" className="profileImage" alt="User profile" />
              <div className="flexEditBtn">
                <div>
                  <p className="userName">
                    {profile.name}
                  </p>
                  <p className="userHandle">
                    @{profile.handle}
                  </p>
                </div>
                <div>
                  <button className="editProfileBtn">
                    Edit Profile
                </button>
                </div>
              </div>
              <div className="personalDetails">
                <div className="flexIconDetails">
                  <div className="iconColor">
                    <TiLocationOutline size={20} />
                  </div>
                  <p className="tweetDate">
                    {profile.location}
                  </p>
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
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.user.profile,
  };
};

const mapDispatchToProps = dispatch => ({
  getUserProfile: data => dispatch(userActions.getUserProfile(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);