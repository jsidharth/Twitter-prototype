/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Tabs, Tab } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import UserCard from '../UserCard/UserCard';
import SearchBar from '../Search/SearchBar';

import './FollowTab.css';

class Follower extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { userProfile } = this.props;
    return (
      <div className="flexHomeScreen">
        <div>
          <Sidebar />
        </div>
        <div className="cardWidth">
          <div className="paperHeightForFollowers">
            <Link to={`/profile/${userProfile._id}`}>
              <div className="backIcon">
                <MdKeyboardBackspace size={30} />
              </div>
            </Link>
            <div className="flexFollowTopPane">
              {/* Change the values to Current user */}
              <div className="usernameFollowTab">{userProfile.name}</div>
              <div className="handleFollowTab">@{userProfile.handle}</div>
            </div>
          </div>
          <div className="tabMargin">
            <Tabs
              defaultActiveKey="followers"
              transition={false}
              id="follow-tab"
              className="followTabs"
            >
              <Tab eventKey="followers" title="Followers">
                <div className="followerTab">
                  {userProfile.followers && userProfile.followers.length
                    ? userProfile.followers.map(follower => {
                        return (
                          <div>
                            <UserCard user={follower} long />
                          </div>
                        );
                      })
                    : null}
                </div>
              </Tab>
              <Tab eventKey="following" title="Following">
                <div className="followingTab">
                  {userProfile.following && userProfile.following.length
                    ? userProfile.following.map(follower => {
                        return (
                          <div>
                            <UserCard user={follower} long />
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
  userProfile: state.user.profile,
});

export default connect(mapStateToProps)(Follower);
